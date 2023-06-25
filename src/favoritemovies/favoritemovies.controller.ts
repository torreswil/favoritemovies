import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';
import { User } from 'src/users/user.interface';

@Controller('movies')
export class FavoritemoviesController {
    constructor(private readonly tmdbService: TmdbserviceService, private readonly usersService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('popular')
    async getPopularMovies() {
        return this.tmdbService.getPopularMovies();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    async searchMovies(@Query('query') query: string, @Query('language') language: string) {
        return this.tmdbService.searchMovies(query, language);
    }
}
