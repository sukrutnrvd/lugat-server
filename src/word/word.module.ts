import { Dictionary } from 'src/graphql/models/dictionary/dictionary.model';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { JwtService } from '@nestjs/jwt';
import { Meaning } from 'src/graphql/models/meaning/meaning.model';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Word } from 'src/graphql/models/word/word.model';
import { WordResolver } from './word.resolver';
import { WordService } from './word.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary, Word, Meaning]), UserModule],
  providers: [WordService, WordResolver, JwtService, DictionaryService],
})
export class WordModule {}
