import * as crypto from 'crypto';

import { EmailService } from 'src/email/email.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  constructor(private readonly emailService: EmailService) {}

  generateOtp(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  isOtpValid(otpExpiresAt: Date): boolean {
    return otpExpiresAt > new Date();
  }

  sendOtpEmail(email: string, otp: string): void {
    this.emailService.sendOtpEmail(email, otp);
  }
}
