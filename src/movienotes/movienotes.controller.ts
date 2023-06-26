import { Body, Controller, Post, Put, Param, Req, UseGuards, UsePipes } from '@nestjs/common';
import { MovienotesService } from './movienotes.service';
import { CreateMovienoteDto, UpdateMovienoteDto } from './movienote.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidateMovienotePipe } from './validate-movienote/validate-movienote.pipe';

@Controller('movienotes')
export class MovienotesController {
  constructor(private readonly movienotesService: MovienotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidateMovienotePipe())
  async createMovinote(@Body() createMovinoteDto: CreateMovienoteDto, @Req() request: any) {
    const userId = request.user?.sub;
    return this.movienotesService.addMovienote(userId,createMovinoteDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put(':movinoteId')
  async updateMovienote(
    @Param('movinoteId') movinoteId: string,
    @Body() updateMovienoteDto: UpdateMovienoteDto,
  ) {
    return this.movienotesService.updateMovienote(movinoteId, updateMovienoteDto);
  }
}