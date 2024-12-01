import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.model';
import { Word } from '../word/word.model';

@Entity({ name: 'dictionary' })
@ObjectType()
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @Field()
  name: string;

  @OneToMany(() => Word, (word) => word.dictionary, {
    onDelete: 'CASCADE',
    cascade: ['remove'],
  })
  @Field(() => [Word], { nullable: true })
  words?: Word[];

  @ManyToOne(() => User, (user) => user.dictionaries, {
    nullable: false,
  })
  user: User;
}
