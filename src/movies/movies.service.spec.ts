import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movies.service';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { ConfigService } from '@nestjs/config';
import { Movie } from './movie.entity';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';

class DataMapperMock {
  async put(movie: Movie): Promise<Movie> {
    return movie;
  }

  async get(movie: Movie): Promise<Movie | undefined> {
    return undefined; // Modifica esta implementación según tus necesidades de prueba
  }
}

describe('MoviesService', () => {
  let service: MovieService;
  let dataMapperMock: DataMapper;

  beforeEach(async () => {
    dataMapperMock = new DataMapperMock() as DataMapper;
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, DynamoDBProvider, MovieService,
        {
          provide: DynamoDBProvider,
          useValue: {
            mapper: dataMapperMock
          },
        },],
    }).compile();

    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMovie', () => {
    it('should create a movie', async () => {
      // Arrange
      const movie: Movie = {
        movieId: '123',
        title: 'Test Movie',
        movieApiId: '',
        movieIMDBId: '',
        languages: '',
        overview: '',
        releaseDate: ''
      };

      jest.spyOn(dataMapperMock, 'put').mockImplementation(async () => movie);

      // Act
      const result = await service.createMovie(movie);

      // Assert
      expect(result).toEqual(movie);
      expect(dataMapperMock.put).toHaveBeenCalledWith(movie);
    });
  });

  describe('getMovieById', () => {
    it('should return a movie by its ID', async () => {
      // Arrange
      const movieId = '123';
      const movie: Movie = {
        movieId: movieId,
        title: 'Test Movie',
        movieApiId: '',
        movieIMDBId: '',
        languages: '',
        overview: '',
        releaseDate: ''
      };

      jest.spyOn(dataMapperMock, 'get').mockResolvedValueOnce(movie);

      // Act
      const result = await service.getMovieById(movieId);

      // Assert
      expect(result).toEqual(movie);
      expect(dataMapperMock.get).toHaveBeenCalledWith(Object.assign(new Movie(), { movieId }));
    });

    it('should return undefined if movie is not found', async () => {
      // Arrange
      const movieId = '123';

      jest.spyOn(dataMapperMock, 'get').mockResolvedValueOnce(undefined);

      // Act
      const result = await service.getMovieById(movieId);

      // Assert
      expect(result).toBeUndefined();
      expect(dataMapperMock.get).toHaveBeenCalledWith(Object.assign(new Movie(), { movieId }));
    });
    
  });
});
