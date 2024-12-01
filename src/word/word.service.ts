import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { CreateWordInput } from 'src/graphql/inputs/word/create-word.input';
import { UpdateWordInput } from 'src/graphql/inputs/word/update-word.input';
import { Dictionary } from 'src/graphql/models/dictionary/dictionary.model';
import { Meaning } from 'src/graphql/models/meaning/meaning.model';
import { Word } from 'src/graphql/models/word/word.model';
import { Repository } from 'typeorm';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepository: Repository<Word>,
    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,
    private readonly dictionaryService: DictionaryService,
  ) {}

  async getWordsByDictionaryId(
    userId: string,
    dictionaryId: string,
  ): Promise<Word[]> {
    return this.wordRepository.find({
      where: { dictionary: { id: dictionaryId, user: { id: userId } } },
      relations: ['meanings'],
    });
  }

  async getWordById(userId: string, wordId: string): Promise<Word> {
    const word = await this.wordRepository.findOne({
      where: { id: wordId, dictionary: { user: { id: userId } } },
      relations: ['meanings'],
    });

    if (!word) throw new NotFoundException('Word not found');

    return word;
  }

  async createWord(input: CreateWordInput, userId: string): Promise<Word> {
    const word = this.wordRepository.create(input);
    const meanings = input.meanings?.map((meaning) =>
      this.meaningRepository.create(meaning),
    );

    if (meanings) await this.meaningRepository.save(meanings);

    const dictionary = await this.dictionaryService.getDictionaryById(
      userId,
      input.dictionaryId,
    );
    if (!dictionary) throw new NotFoundException('Dictionary not found');

    word.dictionary = dictionary;
    word.meanings = meanings;

    return this.wordRepository.save(word);
  }

  async updateWord(input: UpdateWordInput, userId: string): Promise<Word> {
    const word = await this.getWordById(userId, input.wordId);
    word.word = input.word;
    word.tags = input.tags;
    return this.wordRepository.save(word);
  }

  async deleteWord(userId: string, wordId: string): Promise<Word> {
    const word = await this.getWordById(userId, wordId);
    const deletedWord = this.wordRepository.create(word);
    await this.wordRepository.remove(word);
    return deletedWord;
  }
}
