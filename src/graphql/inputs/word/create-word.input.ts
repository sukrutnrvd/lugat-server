import { Field, InputType } from '@nestjs/graphql';

import { CreateDictionaryInput } from '../dictionary/create-dictionary.input';
import { CreateMeaningInput } from '../meaning/create-meaning.input';
import { Dictionary } from 'src/graphql/models/dictionary/dictionary.model';

@InputType()
export class CreateWordInput {
  @Field({ nullable: false })
  dictionaryId: string;
  @Field({ nullable: false })
  word: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [CreateMeaningInput], { nullable: true })
  meanings?: CreateMeaningInput[];
}
