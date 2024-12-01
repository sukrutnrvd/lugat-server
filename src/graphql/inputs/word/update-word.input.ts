import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateWordInput {
  @Field(() => ID)
  wordId: string;

  @Field({ nullable: false })
  word: string;

  @Field(() => [String], { nullable: true })
  tags: string[];
}
