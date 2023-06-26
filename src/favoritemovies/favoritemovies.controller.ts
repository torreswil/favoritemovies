import { Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { AuthGuard } from '@nestjs/passport';
import { FavoritemoviesService } from './favoritemovies.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('movies')
export class FavoritemoviesController {
    constructor(
        private readonly tmdbService: TmdbserviceService,
        private readonly favoriteMoviesService: FavoritemoviesService,
    ) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('popular')
    async getPopularMovies() {
        return this.tmdbService.getPopularMovies();
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('search')
    async searchMovies(@Query('query') query: string, @Query('language') language: string) {
        return this.tmdbService.searchMovies(query, language);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Post(':movieId')
    async addFavoriteMovie(@Param('movieId') movieId: string, @Req() request: any) {
        return this.favoriteMoviesService.addFavoriteMovie(movieId, request.user?.sub);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('favorites')
    async getFavoriteMovies(@Req() request: any) {
        return this.favoriteMoviesService.getFavoriteMovies(request.user?.sub);
    }
}
