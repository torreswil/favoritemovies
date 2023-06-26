import { Module } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { FavoritemoviesController } from './favoritemovies.controller';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/users/user.service';
import { FavoritemoviesService } from './favoritemovies.service';
import { DynamoDBProvider } from 'src/config/dynamodb.provider';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MovieService } from 'src/movies/movies.service';

@Module({
  providers: [
    TmdbserviceService,
    UserService,
    FavoritemoviesService,
    ConfigService,
    DynamoDBProvider,
    AuthService,
    JwtService,
    MovieService,
  ],
  controllers: [FavoritemoviesController],
  imports: [HttpModule],
})
export class FavoritemoviesModule {}
