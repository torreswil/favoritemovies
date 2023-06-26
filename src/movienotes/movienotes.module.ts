import { Module } from '@nestjs/common';
import { MovienotesService } from './movienotes.service';
import { MovienotesController } from './movienotes.controller';
import { DynamoDBProvider } from '../config/dynamodb.provider';

@Module({
  providers: [MovienotesService, DynamoDBProvider],
  controllers: [MovienotesController]
})
export class MovienotesModule {}
