import { Test, TestingModule } from '@nestjs/testing';
import { MovienotesService } from './movienotes.service';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { Movienote } from './movienote.entity';
import { CreateMovienoteDto, UpdateMovienoteDto } from './movienote.dto';
import { ConfigService } from '@nestjs/config';


describe('MovienotesService', () => {
  let service: MovienotesService;
  let dbProvider: DynamoDBProvider;
  let mapper: DataMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        MovienotesService,
        DynamoDBProvider,
      ],
    }).compile();

    service = module.get<MovienotesService>(MovienotesService);
    dbProvider = module.get<DynamoDBProvider>(DynamoDBProvider);
    mapper = dbProvider.mapper;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('addMovienote', () => {
    it('should add a movienote', async () => {
      // Mock the mapper and put method

      const createMovienoteDto: CreateMovienoteDto = {
        movieId: 'movie-id',
        title: 'Movie Title',
        imageUrl: 'http://example.com/image.jpg',
      };

      jest.spyOn(mapper, 'put').mockResolvedValueOnce(Object.assign(new Movienote(), createMovienoteDto));

      const userId = 'user-id';


      const result = await service.addMovienote(userId, createMovienoteDto);

      expect(result).toBeDefined();
      expect(result.movieId).toBe(createMovienoteDto.movieId);
      expect(result.title).toBe(createMovienoteDto.title);
      expect(result.imageUrl).toBe(createMovienoteDto.imageUrl);
      // You can add more assertions based on the expected behavior
    });
  });

  describe('updateMovienote', () => {
    it('should update a movienote', async () => {
      // Mock the mapper and put method
      const movienoteId = 'movienote-id';
      const updateMovienoteDto: UpdateMovienoteDto = {
        title: 'Updated Movie Title',
        imageUrl: 'http://example.com/updated-image.jpg',
      };
      jest.spyOn(mapper, 'put').mockResolvedValueOnce(updateMovienoteDto);



      const result = await service.updateMovienote(movienoteId, updateMovienoteDto);

      expect(result).toBeDefined();
      expect(result.title).toBe(updateMovienoteDto.title);
      expect(result.imageUrl).toBe(updateMovienoteDto.imageUrl);
      // You can add more assertions based on the expected behavior
    });
  });
});
