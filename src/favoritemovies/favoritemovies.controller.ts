import { Controller, Get } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';

@Controller('movies')
export class FavoritemoviesController {
    constructor (private readonly tmdbService: TmdbserviceService) {}

    @Get('popular')
    getPopularMovies() {
        const movies = this.tmdbService.getPopularMovies();
        return movies;
    }
}
