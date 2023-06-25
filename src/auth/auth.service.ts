import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { User } from 'src/users/user.interface';
import { UserService } from 'src/users/user.service';

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

  authenticateUser(user: { name: string, password: string}) {
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
          try {
            // Verificar si el usuario ya existe en la tabla
            console.log('name', name);
            let existingUser = await this.userService.getUserByName(name);
            console.log('existingUser', existingUser);
            if (!existingUser) {
              // Crear el nuevo usuario con el ID de Cognito
              const newUser: User = {
                userId: result.getIdToken().payload.sub, // Obtener el ID de Cognito
                name: name,
                email: '', // Puedes asignar un valor por defecto o dejarlo vacío
              };
              existingUser = await this.userService.createUser(newUser);
            }
            
            resolve(result);
          } catch (error) {
            reject(error);
          }
        },
        onFailure: err => {
          reject(err);
        },
      });
    });
  }
}
