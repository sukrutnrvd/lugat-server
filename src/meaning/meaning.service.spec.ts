import { Test, TestingModule } from '@nestjs/testing';
import { MeaningService } from './meaning.service';

describe('MeaningService', () => {
  let service: MeaningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeaningService],
    }).compile();

    service = module.get<MeaningService>(MeaningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
