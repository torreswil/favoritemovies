import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbserviceService {

    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly logger = new Logger(TmdbserviceService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.apiKey = this.configService.get<string>('MOVIE_DB_API_KEY');
        this.baseUrl = this.configService.get<string>('MOVIE_DB_BASE_URL');
    }

    async getPopularMovies(): Promise<any> {
        const { data } = await firstValueFrom(
            this.httpService.get(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`).pipe(
                catchError((error) => {
                    //this.logger.error(error);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }

    async searchMovies(query: string, language: string): Promise<any> {
        const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=${language}`;
        const { data } = await firstValueFrom(
            this.httpService.get(url).pipe(
                catchError((error) => {
                    //this.logger.error(error);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }

    async getMovieById(movieId: string): Promise<any> {
        const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
        const { data } = await firstValueFrom(
            this.httpService.get(url).pipe(
                catchError((error) => {
                    //this.logger.error(error);
                    throw 'An error happened!';
                }),
            ),
        );
        return data;
    }
}
