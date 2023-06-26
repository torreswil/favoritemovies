import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ConfigAppModule } from '../config/config.module';
import { BadRequestException } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UserService } from '../users/user.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigAppModule, AuthModule],
      providers: [AuthService, ConfigService, UserService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login should be defined', () => {
    expect(controller.login).toBeDefined();
  });

  it('should return a token', async () => {
    // Mock the authentication service
    const user = { name: 'valid_username', password: 'valid_password' };
    const payload = {
      accessToken: {
        payload: {
          sub: 'valid_sub',
          username: 'valid_username',
        }
      }
    };
    jest.spyOn(authService, 'authenticateUser').mockResolvedValueOnce(payload);

    // Call the method under test
    const result = await controller.login(user);

    // Assertions
    expect(authService.authenticateUser).toHaveBeenCalledWith(user);
    expect(result).toEqual(payload);
  });

  it('should throw an error', async () => {
    const user = { name: 'valid_username', password: 'valid_password' };
    const error = new Error('Authentication error');
    jest.spyOn(authService, 'authenticateUser').mockRejectedValueOnce(error);

    // Call the method under test
    try {
      await controller.login(user);
    } catch (e) {
      // Assertion
      expect(e).toBeInstanceOf(BadRequestException);
      expect(e.message).toBe('Authentication error');
    }
  });
});
