import { Dictionary } from 'src/graphql/models/dictionary/dictionary.model';
import { DictionaryResolver } from './dictionary.resolver';
import { DictionaryService } from './dictionary.service';
import { JwtService } from '@nestjs/jwt';
import { Meaning } from 'src/graphql/models/meaning/meaning.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Word } from 'src/graphql/models/word/word.model';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Dictionary, Word, Meaning])],
  providers: [DictionaryResolver, JwtService, DictionaryService],
})
export class DictionaryModule {}
