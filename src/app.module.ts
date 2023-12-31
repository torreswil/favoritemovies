import { Module } from '@nestjs/common';
import { FavoritemoviesModule } from './favoritemovies/favoritemovies.module';
import { ConfigAppModule } from './config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MovieService } from './movies/movies.service';
import { DynamoDBProvider } from './config/dynamodb.provider';
import { MovienotesModule } from './movienotes/movienotes.module';

@Module({
  imports: [
    ConfigAppModule,
    FavoritemoviesModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    MovienotesModule,
  ],
  providers: [MovieService, DynamoDBProvider],
})
export class AppModule {}
