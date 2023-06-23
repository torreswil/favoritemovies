import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { TmdbserviceService } from './tmdbservice.service';

describe('MovieService', () => {
  let movieService: TmdbserviceService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TmdbserviceService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    movieService = moduleRef.get<TmdbserviceService>(TmdbserviceService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  describe('getPopularMovies', () => {
    it('should return an array of popular movies', async () => {
      // Arrange
      const expectedMovies = {
        "page": 1,
        "results": [
          {
            "adult": false,
            "backdrop_path": "/e2Jd0sYMCe6qvMbswGQbM0Mzxt0.jpg",
            "genre_ids": [
              28,
              80,
              53
            ],
            "id": 385687,
            "original_language": "en",
            "original_title": "Fast X",
            "overview": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
            "popularity": 6682.1,
            "poster_path": "/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
            "release_date": "2023-05-17",
            "title": "Fast X",
            "video": false,
            "vote_average": 7.3,
            "vote_count": 1848
          }
        ]
      };
      const axiosResponse: AxiosResponse = {
        data: expectedMovies,
        status: 200,
        statusText: 'OK',
        headers: undefined,
        config: undefined
      };

      jest.spyOn(httpService.axiosRef, 'get').mockResolvedValue(axiosResponse);

      // Act
      const result = await movieService.getPopularMovies();

      // Assert
      expect(result).toEqual(expectedMovies);
    });

    it('should throw an error if the API call fails', async () => {
      // Arrange
      jest.spyOn(httpService.axiosRef, 'get').mockImplementationOnce(() => {
        throw new Error('An error happened!');
      });

      // Act and Assert
      try {
        await movieService.getPopularMovies();
        // Si no se lanza ninguna excepción, falla la prueba
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBe('An error happened!');
      }
    });
  });
});