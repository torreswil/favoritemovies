import { DataMapper, ScanOptions } from '@aws/dynamodb-data-mapper';
import { Injectable } from '@nestjs/common';
import { DynamoDBProvider } from 'src/config/dynamodb.provider';
import { FavoriteMovie } from './favoritemovie.entity';
import { MovieService } from 'src/movies/movies.service';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { Movie } from 'src/movies/movie.entity';


@Injectable()
export class FavoritemoviesService {
    private readonly mapper: DataMapper;

    constructor(
        private readonly dbProvider: DynamoDBProvider,
        private readonly movieService: MovieService,
        private readonly tmdbserviceService: TmdbserviceService
    ) {
        this.mapper = dbProvider.mapper;
    }

    async addFavoriteMovie(movieId: string, userId: string): Promise<FavoriteMovie> {
        const favoriteMovieId = `${userId}_${movieId}`;

        // La película favorita no existe, crearla utilizando el servicio MovieService

            
        const tmdbMovie = await this.tmdbserviceService.getMovieById(movieId);
        if (!tmdbMovie) {
            throw 'Movie not found';
        }
        const newMovie = Object.assign(new Movie, 
            { 
                movieId,
                movieApiId: tmdbMovie.id,
                movieIMDBId: tmdbMovie.imdb_id,
                languages: tmdbMovie.spoken_languages ? JSON.stringify(tmdbMovie.spoken_languages) : '',
                genres: tmdbMovie.genres ? JSON.stringify(tmdbMovie.genres) : '',
                originalLaguage: tmdbMovie.original_language,
                title: tmdbMovie.title, 
                overview: tmdbMovie.overview,
                popularity: tmdbMovie.popularity, 
                posterPath: tmdbMovie.poster_path ?? '', 
                releaseDate: tmdbMovie.release_date ?? '',
                video: tmdbMovie.video ?? '',
                voteAverage: tmdbMovie.vote_average,
                voteCount: tmdbMovie.vote_count 
            });
        
        await this.movieService.createMovie(newMovie);


        const toSave = Object.assign(new FavoriteMovie, { favoriteMovieId: `${userId}_${movieId}`, movieId, userId, movie:JSON.stringify(newMovie) });
        return await this.mapper.put(toSave);
    }

    async getFavoriteMovies( userId: string): Promise<FavoriteMovie[]> {
        const scanOptions: ScanOptions = {
            filter: {
              type: 'Equals',
              subject: 'userId',
              object: userId,
            },
          };
        
          const favoriteMovies: FavoriteMovie[] = [];
          for await (const movie of this.mapper.scan(FavoriteMovie, scanOptions)) {
            movie.movie = movie.movie ? JSON.parse(movie?.movie): ''
            favoriteMovies.push(movie);
          }
        
          return favoriteMovies;
    }

}
