import { Module } from '@nestjs/common';
import { TmdbserviceService } from './tmdbservice/tmdbservice.service';
import { FavoritemoviesController } from './favoritemovies.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [TmdbserviceService],
  controllers: [FavoritemoviesController],
  imports: [HttpModule],
})
export class FavoritemoviesModule {}
