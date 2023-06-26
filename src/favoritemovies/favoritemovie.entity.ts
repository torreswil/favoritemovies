import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('favoriteMovies')
export class FavoriteMovie {
  @hashKey()
  favoriteMovieId?: string;

  @attribute()
  movieId?: string;

  @rangeKey()
  userId?: string;

  @rangeKey({ defaultProvider: () => new Date() })
  createdAt?: string;

  @attribute()
  movie?: string;
}
