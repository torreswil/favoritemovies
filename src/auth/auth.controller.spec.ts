import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ConfigAppModule } from '../config/config.module';
import { BadRequestException } from '@nestjs/common';
import { AuthModule } from './auth.module';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigAppModule, AuthModule],
      providers: [AuthService, ConfigService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
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
    const token = 'valid_token';
    jest.spyOn(authService, 'authenticateUser').mockResolvedValueOnce({ token });

    // Call the method under test
    const result = await controller.login(user);

    // Assertions
    expect(authService.authenticateUser).toHaveBeenCalledWith(user);
    expect(result).toEqual({ token });
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
