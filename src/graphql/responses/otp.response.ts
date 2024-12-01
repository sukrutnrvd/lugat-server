import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpResponse {
  @Field()
  success: boolean;

  @Field()
  expiresAt: Date;
}
