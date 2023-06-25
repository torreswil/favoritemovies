import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/users/user.service';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
    providers: [AuthService, JwtStrategy, UserService],
    controllers: [AuthController],
})
export class AuthModule { }
