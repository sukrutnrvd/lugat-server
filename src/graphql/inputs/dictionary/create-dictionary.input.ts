import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateDictionaryInput {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @Field()
  name: string;
}
