import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMeaningInput {
  @Field({ nullable: false })
  meaning: string;

  @Field({ nullable: true })
  example: string;
}
