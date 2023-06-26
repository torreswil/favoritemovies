import { Test, TestingModule } from '@nestjs/testing';
import { MovienotesController } from './movienotes.controller';

describe('MovienotesController', () => {
  let controller: MovienotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovienotesController],
    }).compile();

    controller = module.get<MovienotesController>(MovienotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
