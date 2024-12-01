import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

import { Dictionary } from '../dictionary/dictionary.model';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  @Field()
  username: string;

  @Column({
    unique: true,
    nullable: false,
  })
  @Field()
  email: string;

  @Column({
    nullable: true,
  })
  @Field({ nullable: true })
  otp?: string;

  @Column({
    nullable: true,
    type: 'timestamp',
  })
  @Field({ nullable: true })
  otpExpiry?: Date;

  @OneToMany(() => Dictionary, (dictionary) => dictionary.user, {
    onDelete: 'CASCADE',
    cascade: ['remove'],
  })
  @Field(() => [Dictionary], { nullable: true })
  dictionaries?: Dictionary[];
}
