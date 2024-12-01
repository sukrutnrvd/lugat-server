import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { WordService } from './word.service';
import { Word } from 'src/graphql/models/word/word.model';
import { CreateWordInput } from 'src/graphql/inputs/word/create-word.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateWordInput } from 'src/graphql/inputs/word/update-word.input';

@Resolver()
export class WordResolver {
  constructor(private readonly wordService: WordService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Word])
  getWordsByDictionaryId(
    @Args('dictionaryId') dictionaryId: string,
    @Context('req') req: any,
  ) {
    return this.wordService.getWordsByDictionaryId(req.user.sub, dictionaryId);
  }

  @UseGuards(AuthGuard)
  @Query(() => Word)
  getWordById(@Args('wordId') wordId: string, @Context('req') req: any) {
    return this.wordService.getWordById(req.user.sub, wordId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Word)
  createWord(@Args('word') word: CreateWordInput, @Context('req') req: any) {
    return this.wordService.createWord(word, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Word)
  updateWord(@Args('word') word: UpdateWordInput, @Context('req') req: any) {
    return this.wordService.updateWord(word, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Word)
  deleteWord(@Args('wordId') wordId: string, @Context('req') req: any) {
    return this.wordService.deleteWord(req.user.sub, wordId);
  }
}
