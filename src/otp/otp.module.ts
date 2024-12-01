import { EmailService } from 'src/email/email.service';
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';

@Module({
  providers: [OtpService, EmailService],
  exports: [OtpService],
})
export class OtpModule {}
