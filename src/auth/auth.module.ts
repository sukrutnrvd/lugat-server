import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { OtpModule } from 'src/otp/otp.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    OtpModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver, BcryptService],
  exports: [],
})
export class AuthModule {}
