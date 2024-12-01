import { JwtService } from '@nestjs/jwt';
import { Meaning } from 'src/graphql/models/meaning/meaning.model';
import { MeaningResolver } from './meaning.resolver';
import { MeaningService } from './meaning.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Meaning]), UserModule],
  providers: [JwtService, MeaningService, MeaningResolver],
})
export class MeaningModule {}
