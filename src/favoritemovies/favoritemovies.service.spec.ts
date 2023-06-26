import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { FavoritemoviesService } from './favoritemovies.service';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { FavoriteMovie } from './favoritemovie.entity';
import { MovieService } from '../movies/movies.service';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { Movie } from '../movies/movie.entity';
import { ConfigService } from '@nestjs/config';

class DataMapperMock {
  async put(item: any): Promise<any> {
    return item;
  }

  async scan(item: any): Promise<AsyncIterable<any>> {
    let mockScanResults: any[] = [];
    return {
      [Symbol.asyncIterator]: () => ({
        async next() {
          if (mockScanResults.length === 0) {
            return { done: true, value: undefined };
          }
          return { done: false, value: mockScanResults.shift() };
        },
      }),
    };
  }
}

class MovieServiceMock {
  async createMovie(movie: Movie): Promise<Movie> {
    return movie;
  }
}

class TmdbserviceServiceMock {
  async getMovieById(movieId: string): Promise<any> {
    // Implementación de prueba para getMovieById
    return null;
  }
}

describe('FavoritemoviesService', () => {
  let favoritemoviesService: FavoritemoviesService;
  let dbProvider: DynamoDBProvider;
  let dataMapperMock: DataMapperMock;
  let movieServiceMock: MovieServiceMock;
  let tmdbserviceServiceMock: TmdbserviceServiceMock;

  beforeEach(async () => {
    dataMapperMock = new DataMapperMock();
    movieServiceMock = new MovieServiceMock();
    tmdbserviceServiceMock = new TmdbserviceServiceMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        FavoritemoviesService,
        DynamoDBProvider,
        {
          provide: DynamoDBProvider,
          useValue: {
            mapper: dataMapperMock,
          },
        },
        {
          provide: DataMapper,
          useValue: dataMapperMock,
        },
        {
          provide: MovieService,
          useValue: movieServiceMock,
        },
        {
          provide: TmdbserviceService,
          useValue: tmdbserviceServiceMock,
        },
      ],
    }).compile();

    favoritemoviesService = module.get<FavoritemoviesService>(FavoritemoviesService);
    dbProvider = module.get<DynamoDBProvider>(DynamoDBProvider);
  });

  describe('addFavoriteMovie', () => {
    it('should add a favorite movie', async () => {
      // Arrange
      const movieId = '123';
      const userId = '456';
      const movie = new Movie(); // Modifica esto según tus necesidades
      const favoriteMovie = new FavoriteMovie // Modifica esto según tus necesidades

      jest.spyOn(tmdbserviceServiceMock, 'getMovieById').mockResolvedValue(movie);
      jest.spyOn(movieServiceMock, 'createMovie').mockResolvedValue(movie);
      jest.spyOn(dataMapperMock, 'put').mockResolvedValue(favoriteMovie);

      // Act
      const result = await favoritemoviesService.addFavoriteMovie(movieId, userId);

      // Assert
      expect(result).toStrictEqual(new FavoriteMovie());
      expect(tmdbserviceServiceMock.getMovieById).toHaveBeenCalledWith(movieId);
    });
  });

  describe('getFavoriteMovies', () => {
    it('should get favorite movies for a user', async () => {
      // Arrange
      const userId = '123';
      const favoriteMovies: FavoriteMovie[] = []; // Modifica esto según tus necesidades

      // Act
      const result = await favoritemoviesService.getFavoriteMovies(userId);

      // Assert
      expect(result).toBe(favoriteMovies);
      expect(dataMapperMock.scan).toHaveBeenCalledWith(FavoriteMovie, expect.objectContaining({ filter: { type: 'Equals', subject: 'userId', object: userId } }));
    });
  });
});

