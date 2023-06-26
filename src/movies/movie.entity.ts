import {
  attribute,
  hashKey,
  rangeKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('movies')
export class Movie {
  @hashKey()
  movieId: string;

  @attribute()
  movieApiId: string;

  @attribute()
  movieIMDBId: string;

  @attribute()
  languages: string;

  @attribute()
  genres?: string;

  @attribute()
  originalLanguage?: string;

  @attribute()
  title: string;

  @attribute()
  overview: string;

  @attribute()
  popularity?: string;

  @attribute()
  posterPath?: string;

  @rangeKey({ defaultProvider: () => new Date() })
  releaseDate: string;

  @attribute()
  video?: boolean|string;

  @attribute()
  voteAverage?: string;

  @attribute()
  voteCount?: string;
}
