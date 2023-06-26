import { Injectable, PipeTransform, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMovienoteDto } from '../movienote.dto';

@Injectable()
export class ValidateMovinotePipe implements PipeTransform {
  transform(value: CreateMovienoteDto) {
    if (!value.movieId || !value.title) {
      throw new HttpException('Movie Id and Title is required', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    
    return value;
  }
}