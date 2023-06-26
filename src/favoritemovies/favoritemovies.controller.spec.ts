import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { FavoritemoviesController } from './favoritemovies.controller';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';

describe('FavoritemoviesController', () => {
  let controller: FavoritemoviesController;
  let tmdbService: TmdbserviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<FavoritemoviesController>(FavoritemoviesController);
    tmdbService = module.get<TmdbserviceService>(TmdbserviceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an object with popular movies', async () => {
    // Arrange
    const expectedMovies = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: '/e2Jd0sYMCe6qvMbswGQbM0Mzxt0.jpg',
          genre_ids: [28, 80, 53],
          id: 385687,
          original_language: 'en',
          original_title: 'Fast X',
          overview:
            "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
          popularity: 6682.1,
          poster_path: '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
          release_date: '2023-05-17',
          title: 'Fast X',
          video: false,
          vote_average: 7.3,
          vote_count: 1848,
        },
      ],
    };

    jest
      .spyOn(tmdbService, 'getPopularMovies')
      .mockImplementation(() => Promise.resolve(expectedMovies));

    // Assert
    expect(await controller.getPopularMovies()).toBe(expectedMovies);
  });
});
