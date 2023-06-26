import { Test, TestingModule } from '@nestjs/testing';
import { MovienotesController } from './movienotes.controller';
import { MovienotesService } from './movienotes.service';
import { CreateMovienoteDto, UpdateMovienoteDto } from './movienote.dto';
import { ValidateMovienotePipe } from './validate-movienote/validate-movienote.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Movienote } from './movienote.entity';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { ConfigService } from '@nestjs/config';

describe('MovienotesController', () => {
  let controller: MovienotesController;
  let service: MovienotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovienotesController],
      providers: [ConfigService,DynamoDBProvider,MovienotesService],
    }).compile();

    controller = module.get<MovienotesController>(MovienotesController);
    service = module.get<MovienotesService>(MovienotesService);
  });

  describe('createMovinote', () => {
    it('should call movienotesService.addMovienote and return the result', async () => {
      const userId = '123';
      const createMovinoteDto: CreateMovienoteDto = {
        movieId: '',
        title: ''
      };
      const expectedResult: Movienote = {
        movienoteId: 'movienote-id',
        userId: 'user-id',
        movieId: 'movie-id',
        title: 'Movie Title',
        imageUrl: 'http://example.com/image.jpg'
      };

      jest.spyOn(service, 'addMovienote').mockResolvedValue(expectedResult);

      const request = { user: { sub: userId } };
      const result = await controller.createMovinote(createMovinoteDto, request);

      expect(service.addMovienote).toHaveBeenCalledWith(userId, createMovinoteDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateMovienote', () => {
    it('should call movienotesService.updateMovienote and return the result', async () => {
      const movinoteId = 'abc';
      const updateMovinoteDto: UpdateMovienoteDto = {
        title: ''
      };
      const expectedResult: Movienote = {
        movienoteId: 'movienote-id',
        userId: 'user-id',
        movieId: 'movie-id',
        title: 'Movie Title',
        imageUrl: 'http://example.com/image.jpg'
      };

      jest.spyOn(service, 'updateMovienote').mockResolvedValue(expectedResult);

      const result = await controller.updateMovienote(movinoteId, updateMovinoteDto);

      expect(service.updateMovienote).toHaveBeenCalledWith(movinoteId, updateMovinoteDto);
      expect(result).toEqual(expectedResult);
    });
  });
});
