import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Word } from '../word/word.model';

@Entity({ name: 'meanings' })
@ObjectType()
export class Meaning {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  @Field()
  meaning: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  @Field({ nullable: true })
  example: string;

  @ManyToOne(() => Word, (word) => word.meanings, {
    onDelete: 'CASCADE',
  })
  @Field(() => Word, { nullable: true })
  word?: Word;
}
