import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { Dictionary } from 'src/graphql/models/dictionary/dictionary.model';
import { CreateDictionaryInput } from 'src/graphql/inputs/dictionary/create-dictionary.input';

@Resolver()
export class DictionaryResolver {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Dictionary])
  dictionaries(@Context('req') req: any) {
    return this.dictionaryService.getDictionaries(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Query(() => Dictionary, { nullable: true })
  dictionary(
    @Context('req') req: any,
    @Args('id')
    id: string,
  ) {
    return this.dictionaryService.getDictionaryById(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Dictionary)
  createDictionary(
    @Context('req') req: any,
    @Args('dictionary')
    dictionary: CreateDictionaryInput,
  ) {
    return this.dictionaryService.createDictionary(req.user.sub, dictionary);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Dictionary)
  updateDictionary(
    @Context('req') req: any,
    @Args('id')
    id: string,
    @Args('dictionary')
    dictionary: CreateDictionaryInput,
  ) {
    return this.dictionaryService.updateDictionary(
      req.user.sub,
      id,
      dictionary,
    );
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Dictionary)
  deleteDictionary(
    @Context('req') req: any,
    @Args('id')
    id: string,
  ) {
    return this.dictionaryService.deleteDictionary(req.user.sub, id);
  }
}
