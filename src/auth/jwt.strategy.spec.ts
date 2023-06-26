import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;

  beforeEach(() => {
    // Mock del AuthService y ConfigService
    const authService = {
      // Define los métodos necesarios para el test
    } as AuthService;

    const configService = {
      get: jest.fn(),
    } as any as ConfigService;

    jwtStrategy = new JwtStrategy(authService, configService);
  });

  describe('validate', () => {
    it('should return true when payload.sub exists', async () => {
      const payload = { sub: 'user-id' };

      const result = await jwtStrategy.validate(payload);

      expect(result).toStrictEqual({ sub: 'user-id' });
    });

    it('should return false when payload.sub does not exist', async () => {
      const payload = {};

      const result = await jwtStrategy.validate(payload);

      expect(result).toBe(false);
    });
  });
});