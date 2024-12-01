import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Dictionary } from '../dictionary/dictionary.model';
import { Meaning } from '../meaning/meaning.model';

@Entity({ name: 'words' })
@ObjectType()
export class Word {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @Field()
  word: string;

  @Column({
    type: 'simple-array',
    nullable: true,
  })
  @Field(() => [String], { nullable: true })
  tags: string[];

  @OneToMany(() => Meaning, (meaning) => meaning.word, {
    onDelete: 'CASCADE',
    cascade: ['remove'],
  })
  @Field(() => [Meaning], { nullable: true })
  meanings?: Meaning[];

  @ManyToOne(() => Dictionary, (dictionary) => dictionary.words, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @Field(() => Dictionary, { nullable: false })
  dictionary?: Dictionary;
}
