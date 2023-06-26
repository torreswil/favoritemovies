import { Injectable } from '@nestjs/common';
import { DataMapper, ScanOptions } from '@aws/dynamodb-data-mapper';
import { DynamoDBProvider } from '../config/dynamodb.provider';
import { Movienote } from './movienote.entity';
import { CreateMovienoteDto, UpdateMovienoteDto } from './movienote.dto';

@Injectable()
export class MovienotesService {
  private readonly mapper: DataMapper;

  constructor(private readonly dbProvider: DynamoDBProvider) {
    this.mapper = this.dbProvider.mapper;
  }

  async addMovienote(userId:string, createMovienoteDto:CreateMovienoteDto): Promise<Movienote> {
    const movienoteId = `${userId}_${createMovienoteDto.movieId}`;

    const movienote = Object.assign(new Movienote(), { userId, movienoteId, ...createMovienoteDto });

    const newMovienote = await this.mapper.put(movienote);

    return newMovienote;
  }

  async updateMovienote(
    movienoteId: string,
    updateMovienoteDto: UpdateMovienoteDto,
  ): Promise<Movienote> {
    
    const movieNote = Object.assign(new Movienote, { ...updateMovienoteDto, movienoteId });

    const newMovienote = await this.mapper.put(movieNote);

    return newMovienote;
  }
}