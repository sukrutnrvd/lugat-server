import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Nodemailer için transport yapılandırması
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gmail adresiniz
        pass: process.env.EMAIL_PASSWORD, // Gmail şifreniz (App Password önerilir)
      },
    });
  }

  async sendOtpEmail(to: string, otp: string) {
    return await this.transporter.sendMail({
      to,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    });
  }
}
