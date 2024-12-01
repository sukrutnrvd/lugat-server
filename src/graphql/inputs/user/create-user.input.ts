import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty({ message: 'Username is required' }) // Boş olmamalı
  @Length(3, 20, { message: 'Username must be between 3 and 20 characters' }) // Uzunluk kontrolü
  @IsString({ message: 'Username must be a string' })
  @Matches(/^(?![0-9]+$)[a-zA-Z0-9._]+$/, {
    message:
      'Username must not be only numbers and can only contain letters, numbers, dots, and underscores',
  })
  @Field()
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @Field()
  email: string;
}
