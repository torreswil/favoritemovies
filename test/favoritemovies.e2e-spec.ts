import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { TmdbserviceService } from '../src/favoritemovies/tmdbservice/tmdbservice.service';
import { INestApplication } from '@nestjs/common';
import { FavoritemoviesModule } from '../src/favoritemovies/favoritemovies.module';

describe('popular', () => {
  let app: INestApplication;
  let moviesService = { getPopularMovies: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [FavoritemoviesModule]
    })
      .overrideProvider(TmdbserviceService)
      .useValue(moviesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET popular`, () => {
    return request(app.getHttpServer())
      .get('/movies/popular')
      .expect(200)
      .expect({
        data: moviesService.getPopularMovies(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});