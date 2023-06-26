import { Injectable } from '@nestjs/common';
import { DataMapper, ScanOptions } from '@aws/dynamodb-data-mapper';
import { DynamoDBProvider } from 'src/config/dynamodb.provider';
import { Movienote } from './movienote.entity';
import { CreateMovienoteDto, UpdateMovienoteDto } from './movienote.dto';

@Injectable()
export class MovienotesService {
  private readonly mapper: DataMapper;

  constructor(private readonly dbProvider: DynamoDBProvider) {
    this.mapper = dbProvider.mapper;
  }

  async addMovienote(userId:string, createMovienoteDto:CreateMovienoteDto): Promise<Movienote> {
    const movienoteId = `${userId}_${createMovienoteDto.movieId}`;

    const movienote = Object.assign(new Movienote(), { userId, movienoteId, ...createMovienoteDto });

    return await this.mapper.put(movienote);
  }

  async updateMovinote(
    movienoteId: string,
    updateMovienoteDto: UpdateMovienoteDto,
  ): Promise<Movienote> {
    
    const movieNote = Object.assign(new Movienote, { ...this.updateMovinote, movienoteId });

    return await this.mapper.put(movieNote);
  }
}