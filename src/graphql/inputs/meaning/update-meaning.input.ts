import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMeaningInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  meaning: string;

  @Field({ nullable: true })
  example?: string;
}
