import { Injectable } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  private readonly mapper: DataMapper;

  constructor(private readonly dbProvider: DynamoDBProvider) {
    this.mapper = dbProvider.mapper;
  }

  async createMovie(movie: Movie): Promise<Movie> {
    return await this.mapper.put(movie);
  }

  async getMovieById(movieId: string): Promise<Movie | undefined> {
    const movie = new Movie();
    movie.movieId = movieId;
    return await this.mapper.get(movie);
  }
}
