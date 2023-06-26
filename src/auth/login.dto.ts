import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: 'Cognito username'
    })
    name: string;


    @ApiProperty({
        description: 'El titulo de la película'
    })
    password: string;
}