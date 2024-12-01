import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserAuthResponse {
  @Field()
  success: boolean;

  @Field()
  token: string;
}
