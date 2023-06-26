import { Module } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { FavoritemoviesController } from './favoritemovies.controller';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../users/user.service';
import { FavoritemoviesService } from './favoritemovies.service';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MovieService } from '../movies/movies.service';

@Module({
  providers: [
    DynamoDBProvider,
    TmdbserviceService,
    UserService,
    FavoritemoviesService,
    ConfigService,
    AuthService,
    JwtService,
    MovieService,
  ],
  controllers: [FavoritemoviesController],
  imports: [HttpModule],
})
export class FavoritemoviesModule {}
