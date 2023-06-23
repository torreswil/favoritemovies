import { Module } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { FavoritemoviesController } from './favoritemovies.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TmdbserviceService],
  controllers: [FavoritemoviesController]
})
export class FavoritemoviesModule {}
