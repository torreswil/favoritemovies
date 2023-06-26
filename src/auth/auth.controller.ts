import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { UserService } from '../users/user.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() authenticateRequest: LoginDto) {
    try {
      const result = await this.authService.authenticateUser(authenticateRequest);
      await this.userService.createOrUpdate(result.accessToken.payload.username, result.accessToken.payload.sub);
      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
