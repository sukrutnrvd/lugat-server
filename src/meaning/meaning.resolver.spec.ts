import { Test, TestingModule } from '@nestjs/testing';
import { MeaningResolver } from './meaning.resolver';

describe('MeaningResolver', () => {
  let resolver: MeaningResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeaningResolver],
    }).compile();

    resolver = module.get<MeaningResolver>(MeaningResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
