import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDictionaryInput } from 'src/graphql/inputs/dictionary/create-dictionary.input';
import { Dictionary } from 'src/graphql/models/dictionary/dictionary.model';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Dictionary)
    private readonly dictionaryRepository: Repository<Dictionary>,
    private readonly userService: UserService,
  ) {}

  async getDictionaries(userId: string): Promise<Dictionary[]> {
    return this.dictionaryRepository.find({
      where: { user: { id: userId } },
      relations: ['words', 'words.meanings'],
    });
  }

  async getDictionaryById(userId: string, id: string): Promise<Dictionary> {
    return this.dictionaryRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['words', 'words.meanings'],
    });
  }

  async createDictionary(
    userId: string,
    input: CreateDictionaryInput,
  ): Promise<Dictionary> {
    const createDictionary = this.dictionaryRepository.create(input);
    const user = await this.userService.findById(userId);
    createDictionary.user = user;
    return this.dictionaryRepository.save(createDictionary);
  }

  async updateDictionary(
    userId: string,
    id: string,
    input: CreateDictionaryInput,
  ): Promise<Dictionary> {
    const dictionary = await this.getDictionaryById(userId, id);
    if (!dictionary) {
      throw new NotFoundException('Dictionary not found');
    }
    dictionary.name = input.name;
    return this.dictionaryRepository.save(dictionary);
  }

  async deleteDictionary(userId: string, id: string): Promise<Dictionary> {
    const dictionary = await this.getDictionaryById(userId, id);
    if (!dictionary) {
      throw new NotFoundException('Dictionary not found');
    }
    const returnDictionary = { ...dictionary };
    await this.dictionaryRepository.remove(dictionary);
    return returnDictionary;
  }
}
