import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
