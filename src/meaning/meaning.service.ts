import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { UpdateMeaningInput } from 'src/graphql/inputs/meaning/update-meaning.input';
import { Meaning } from 'src/graphql/models/meaning/meaning.model';
import { Repository } from 'typeorm';

@Injectable()
export class MeaningService {
  constructor(
    @InjectRepository(Meaning)
    private readonly meaningRepository: Repository<Meaning>,
  ) {}

  private async getMeaningById(id: string, userId: string): Promise<Meaning> {
    const meaning = await this.meaningRepository.findOne({
      where: {
        id,
        word: { dictionary: { user: { id: userId } } },
      },
    });
    if (!meaning) throw new NotFoundException('Meaning not found');
    return meaning;
  }

  async updateMeaning(
    input: UpdateMeaningInput,
    userId: string,
  ): Promise<Meaning> {
    const meaning = await this.getMeaningById(input.id, userId);

    meaning.meaning = input.meaning;
    meaning.example = input.example;
    return this.meaningRepository.save(input);
  }

  async deleteMeaning(id: string, userId: string): Promise<Meaning> {
    const meaning = await this.getMeaningById(id, userId);
    const deletedMeaning = this.meaningRepository.create(meaning);
    await this.meaningRepository.remove(meaning);
    return deletedMeaning;
  }
}
