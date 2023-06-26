import { Test, TestingModule } from '@nestjs/testing';
import { MovienotesService } from './movienotes.service';

describe('MovienotesService', () => {
  let service: MovienotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovienotesService],
    }).compile();

    service = module.get<MovienotesService>(MovienotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
