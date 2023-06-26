import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { User } from './user.interface';

@Injectable()
export class UserService {
  private readonly documentClient: DynamoDB.DocumentClient;
  private readonly tableName: string = 'users';

  constructor() {
    this.documentClient = new DynamoDB.DocumentClient();
  }

  async getAllUsers(): Promise<User[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.documentClient.scan(params).promise();

    return result.Items as User[];
  }

  async getUserById(id: string): Promise<User | undefined> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id },
    };

    const result = await this.documentClient.get(params).promise();

    return result.Item as User | undefined;
  }

  async getUserByName(name: string): Promise<User | undefined> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
      FilterExpression: '#name = :name',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': name,
      },
    };

    const result = await this.documentClient.scan(params).promise();

    if (result.Items && result.Items.length > 0) {
      // Si se encuentra al menos un usuario, se devuelve el primero de la lista
      return result.Items[0] as User;
    }

    return undefined;
  }

  async createUser(user: User): Promise<User> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: user,
    };
    this.documentClient;
    await this.documentClient.put(params).promise();

    return user;
  }

  async updateUser(
    userId: string,
    updatedUser: User,
  ): Promise<User | undefined> {
    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { userId },
      UpdateExpression: 'set #name = :name, email = :email',
      ExpressionAttributeNames: {
        '#name': 'name',
      },
      ExpressionAttributeValues: {
        ':name': updatedUser.name,
        ':email': updatedUser.email,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.documentClient.update(params).promise();

    return result.Attributes as User | undefined;
  }

  async deleteUser(userId: string): Promise<void> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { userId },
    };

    await this.documentClient.delete(params).promise();
  }

  async createOrUpdate(name: string, sub:string): Promise<void> {
    let existingUser = await this.getUserByName(name);
    if (!existingUser) {
      // Crear el nuevo usuario con el ID de Cognito
      const newUser: User = {
        userId: sub, // Obtener el ID de Cognito
        name: name,
        email: '', // Puedes asignar un valor por defecto o dejarlo vacío
      };
      existingUser = await this.createUser(newUser);
    }
  }
}
