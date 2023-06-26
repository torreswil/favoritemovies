import { Test } from '@nestjs/testing';
import { FavoritemoviesController } from './favoritemovies.controller';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { FavoritemoviesService } from './favoritemovies.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { MovieService } from '../movies/movies.service';

describe('FavoritemoviesController', () => {
  let controller: FavoritemoviesController;
  let tmdbService: TmdbserviceService;
  let favoriteMoviesService: FavoritemoviesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [FavoritemoviesController],
      providers: [DynamoDBProvider, ConfigService,TmdbserviceService, FavoritemoviesService, MovieService],
      imports: [HttpModule],
    }).compile();

    controller = moduleRef.get<FavoritemoviesController>(FavoritemoviesController);
    tmdbService = moduleRef.get<TmdbserviceService>(TmdbserviceService);
    favoriteMoviesService = moduleRef.get<FavoritemoviesService>(FavoritemoviesService);
  });

  describe('getPopularMovies', () => {
    it('should return popular movies', async () => {
      // Mock the tmdbService.getPopularMovies method
      const mockPopularMovies = [{ id: '1', title: 'Movie 1' }, { id: '2', title: 'Movie 2' }];
      jest.spyOn(tmdbService, 'getPopularMovies').mockResolvedValue(mockPopularMovies);

      // Call the getPopularMovies method
      const result = await controller.getPopularMovies();

      // Assertions
      expect(result).toEqual(mockPopularMovies);
      expect(tmdbService.getPopularMovies).toHaveBeenCalled();
    });
  });

  describe('searchMovies', () => {
    it('should search movies', async () => {
      // Mock the tmdbService.searchMovies method
      const query = 'movie';
      const language = 'en';
      const mockSearchResult = [{ id: '1', title: 'Movie 1' }, { id: '2', title: 'Movie 2' }];
      jest.spyOn(tmdbService, 'searchMovies').mockResolvedValue(mockSearchResult);

      // Call the searchMovies method
      const result = await controller.searchMovies(query, language);

      // Assertions
      expect(result).toEqual(mockSearchResult);
      expect(tmdbService.searchMovies).toHaveBeenCalledWith(query, language);
    });
  });

  describe('addFavoriteMovie', () => {
    it('should add a favorite movie', async () => {
      // Mock the favoriteMoviesService.addFavoriteMovie method
      const movieId = '123';
      const userId = '456';
      const mockFavoriteMovie = { id: '1', movieId, userId };
      jest.spyOn(favoriteMoviesService, 'addFavoriteMovie').mockResolvedValue(mockFavoriteMovie);

      // Call the addFavoriteMovie method
      const request = { user: { sub: userId } };
      const result = await controller.addFavoriteMovie(movieId, request);

      // Assertions
      expect(result).toEqual(mockFavoriteMovie);
      expect(favoriteMoviesService.addFavoriteMovie).toHaveBeenCalledWith(movieId, userId);
    });
  });

  describe('getFavoriteMovies', () => {
    it('should return favorite movies', async () => {
      // Mock the favoriteMoviesService.getFavoriteMovies method
      const userId = '456';
      const mockFavoriteMovies = [
        { id: '1', movieId: '123', userId },
        { id: '2', movieId: '789', userId },
      ];
      jest.spyOn(favoriteMoviesService, 'getFavoriteMovies').mockResolvedValue(mockFavoriteMovies);

      // Call the getFavoriteMovies method
      const request = { user: { sub: userId } };
      const result = await controller.getFavoriteMovies(request);

      // Assertions
      expect(result).toEqual(mockFavoriteMovies);
      expect(favoriteMoviesService.getFavoriteMovies).toHaveBeenCalledWith(userId);
    });
  });
});
