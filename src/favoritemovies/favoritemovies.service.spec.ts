import { Test, TestingModule } from '@nestjs/testing';
import { FavoritemoviesService } from './favoritemovies.service';

describe('FavoritemoviesService', () => {
  let service: FavoritemoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritemoviesService],
    }).compile();

    service = module.get<FavoritemoviesService>(FavoritemoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
