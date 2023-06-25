import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ConfigAppModule } from '../config/config.module';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

describe('AuthService', () => {
  let service: AuthService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigAppModule],
      providers: [ConfigService, AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should authenticate user and resolve with the result', async () => {
    // Mock the config service
    const userPoolId = 'USER_POOL_ID';
    const clientId = 'CLIENT_ID';
    jest.spyOn(configService, 'get').mockImplementation((key: string) => {
      if (key === 'COGNITO_USER_POOL_ID') {
        return userPoolId;
      } else if (key === 'COGNITO_CLIENT_ID') {
        return clientId;
      }
    });

    const authenticateUserMock = jest.fn().mockImplementation((_authenticationDetails: AuthenticationDetails, callbacks: any) => {
      callbacks.onSuccess('authentication success');
    });
    const CognitoUserPoolMock = jest.fn().mockImplementation((_options: any) => {
      return {
        authenticateUser: authenticateUserMock,
      };
    });
    const CognitoUserMock = jest.fn().mockImplementation((_userData: any) => {
      return {
        authenticateUser: authenticateUserMock,
      };
    });
    jest.spyOn(CognitoUser.prototype, 'authenticateUser').mockImplementation(authenticateUserMock);

    // Call the method under test
    const user = { name: 'testuser', password: 'password' };
    const result = await service.authenticateUser(user);

    // Assertions
    expect(result).toEqual('authentication success');
  });

  it('should reject with error on authentication failure', async () => {
    // Mock the CognitoUser.authenticateUser method to trigger onFailure callback
    const mockAuthenticateUser = jest.fn((authDetails, callbacks) => {
      callbacks.onFailure('authentication failure');
    });
    jest.spyOn(CognitoUser.prototype, 'authenticateUser').mockImplementation(mockAuthenticateUser);

    try {
      await service.authenticateUser({ name: 'test', password: 'test' });
      // If the promise resolves, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe('authentication failure');
      expect(mockAuthenticateUser).toHaveBeenCalledTimes(1);
    }
  });
});
