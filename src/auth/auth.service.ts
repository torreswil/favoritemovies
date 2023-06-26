import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { User } from '../users/user.interface';
import { UserService } from '../users/user.service';
@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {

    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
    });
  }

  authenticateUser(user: { name: string, password: string }): Promise<any> {
    const { name, password } = user;

    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: async result => {
          resolve(result);
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  }
}
