import { Body, Controller, Post, Put, Param, Req, UseGuards, UsePipes } from '@nestjs/common';
import { MovienotesService } from './movienotes.service';
import { CreateMovienoteDto, UpdateMovienoteDto } from './movienote.dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidateMovinotePipe } from './validate-movienote/validate-movienote.pipe';

@Controller('movienotes')
export class MovienotesController {
  constructor(private readonly movienotesService: MovienotesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidateMovinotePipe())
  async createMovinote(@Body() createMovinoteDto: CreateMovienoteDto, @Req() request: any) {
    const userId = request.user?.sub;
    return this.movienotesService.addMovienote(userId,createMovinoteDto);
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Put(':movinoteId')
  async updateMovienote(
    @Param('movinoteId') movinoteId: string,
    @Body() updateMovinoteDto: UpdateMovienoteDto,
  ) {
    return this.movienotesService.updateMovinote(movinoteId, updateMovinoteDto);
  }
}