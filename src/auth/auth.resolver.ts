import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/graphql/inputs/user/create-user.input';
import { OtpResponse } from 'src/graphql/responses/otp.response';
import { UserAuthResponse } from 'src/graphql/responses/user-auth.response';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserResponse } from 'src/graphql/responses/user.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Query(() => UserResponse)
  async me(@Context('req') req: any): Promise<UserResponse> {
    return this.authService.getMe(req.user.sub);
  }

  @Mutation(() => OtpResponse)
  async signup(@Args('user') userInput: CreateUserInput): Promise<OtpResponse> {
    return this.authService.createUser(userInput);
  }

  @Mutation(() => UserAuthResponse)
  verifyOtp(
    @Args('email') email: string,
    @Args('otp') otp: string,
  ): Promise<UserAuthResponse> {
    return this.authService.verifyOtp(email, otp);
  }

  @Mutation(() => OtpResponse)
  login(@Args('email') email: string): Promise<OtpResponse> {
    return this.authService.sendOtp(email);
  }
}
