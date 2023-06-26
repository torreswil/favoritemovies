import { ValidateMovienotePipe } from './validate-movienote.pipe';
import { CreateMovienoteDto } from '../movienote.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ValidateMovienotePipe', () => {
  let pipe: ValidateMovienotePipe;

  beforeEach(() => {
    pipe = new ValidateMovienotePipe();
  });

  it('should throw BadRequestException if movieId or title is missing', () => {
    const invalidMovienote: CreateMovienoteDto = {
      movieId: '',
      title: ''
    };

    expect(() => pipe.transform(invalidMovienote)).toThrowError(HttpException);
    expect(() => pipe.transform(invalidMovienote)).toThrowError(
      new HttpException('Movie Id and Title is required', HttpStatus.UNPROCESSABLE_ENTITY),
    );
  });

  it('should return the value if movieId and title are present', () => {
    const validMovienote: CreateMovienoteDto = {
      movieId: '123',
      title: 'Test Movie',
    };

    const result = pipe.transform(validMovienote);

    expect(result).toEqual(validMovienote);
  });
});
