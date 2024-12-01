import { BadRequestException, Injectable } from '@nestjs/common';

import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserInput } from 'src/graphql/inputs/user/create-user.input';
import { JwtService } from '@nestjs/jwt';
import { OtpResponse } from 'src/graphql/responses/otp.response';
import { OtpService } from 'src/otp/otp.service';
import { User } from 'src/graphql/models/user/user.model';
import { UserAuthResponse } from 'src/graphql/responses/user-auth.response';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly otpService: OtpService,
    private readonly bcryptService: BcryptService,
  ) {}

  async getMe(userId: string): Promise<User> {
    return this.userService.findById(userId);
  }

  async createUser({ email, username }: CreateUserInput): Promise<OtpResponse> {
    const user = await this.userService.findByUsernameOrEmail(username, email);

    if (user) throw new BadRequestException('User already exists');

    const newUser = this.userService.createUser({ email, username });

    const otp = this.otpService.generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    newUser.otp = await this.bcryptService.hashPassword(otp);
    newUser.otpExpiry = otpExpiresAt;

    await this.userService.saveUser(newUser);

    this.otpService.sendOtpEmail(newUser.email, otp);
    return {
      success: true,
      expiresAt: newUser.otpExpiry,
    };
  }

  async verifyOtp(email: string, otp: string): Promise<UserAuthResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('User not found');

    const isOtpValid = await this.bcryptService.comparePassword(otp, user.otp);

    if (!isOtpValid) {
      throw new BadRequestException('Invalid OTP');
    }

    if (!this.otpService.isOtpValid(user.otpExpiry)) {
      await this.resetOtp(user);
      throw new BadRequestException('OTP expired');
    }

    await this.resetOtp(user);

    const payload = this.generatePayload(user);
    return {
      success: true,
      token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async sendOtp(email: string): Promise<OtpResponse> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('User not found');

    if (user.otpExpiry && this.otpService.isOtpValid(user.otpExpiry)) {
      return {
        success: false,
        expiresAt: user.otpExpiry,
      };
    }

    const otp = this.otpService.generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otp = await this.bcryptService.hashPassword(otp);
    user.otpExpiry = otpExpiresAt;

    await this.userService.saveUser(user);
    this.otpService.sendOtpEmail(user.email, otp);
    return {
      success: true,
      expiresAt: user.otpExpiry,
    };
  }

  private async resetOtp(user: User) {
    user.otp = null;
    user.otpExpiry = null;
    await this.userService.saveUser(user);
  }

  private generatePayload(user: User) {
    return {
      email: user.email,
      username: user.username,
      sub: user.id,
    };
  }
}
