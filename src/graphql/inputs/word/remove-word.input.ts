import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveWordInput {
  @Field(() => ID)
  id: string;
}
