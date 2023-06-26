import { ApiProperty } from "@nestjs/swagger";

export class CreateMovienoteDto {
    @ApiProperty({
        description: 'El id de la película, es el mismo que en The Movie Database'
    })
    movieId: string;


    @ApiProperty({
        description: 'El titulo de la película'
    })
    title: string;


    @ApiProperty({
        description: 'La url de la imagen de la película',
        required: false
    })
    imageUrl?: string;
}

export class UpdateMovienoteDto {
    @ApiProperty()
    title: string;
    @ApiProperty()
    imageUrl?: string;
}