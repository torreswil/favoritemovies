import { Module } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { FavoritemoviesController } from './favoritemovies.controller';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/user.service';

@Module({
  providers: [TmdbserviceService, UserService],
  controllers: [FavoritemoviesController],
  imports: [HttpModule],
})
export class FavoritemoviesModule {}
