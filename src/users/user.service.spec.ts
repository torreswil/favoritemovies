import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DynamoDB } from 'aws-sdk';
import { User } from './user.interface';

describe('UserService', () => {
  let service: UserService;
  let documentClient: DynamoDB.DocumentClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    documentClient = new DynamoDB.DocumentClient({
        region: 'us-east-1',
        accessKeyId: 'AWS_ACCESS_KEY_ID',
        secretAccessKey: 'AWS_SECRET_ACCESS_KEY',
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ];
      const scanSpy = jest.spyOn(documentClient, 'scan').mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Items: users }),
      } as any);

      const result = await service.getAllUsers();

      expect(scanSpy).toHaveBeenCalledWith({ TableName: 'users' });
      expect(result).toEqual(users);
    }, 10000);
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const user: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const getSpy = jest.spyOn(documentClient, 'get').mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Item: user }),
      } as any);

      const result = await service.getUserById('1');

      expect(getSpy).toHaveBeenCalledWith({
        TableName: 'users',
        Key: { id: '1' },
      });
      expect(result).toEqual(user);
    });

    it('should return undefined if user does not exist', async () => {
      const getSpy = jest.spyOn(documentClient, 'get').mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      } as any);

      const result = await service.getUserById('1');

      expect(getSpy).toHaveBeenCalledWith({
        TableName: 'users',
        Key: { id: '1' },
      });
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const putSpy = jest.spyOn(documentClient, 'put').mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      } as any);

      const result = await service.createUser(user);

      expect(putSpy).toHaveBeenCalledWith({
        TableName: 'users',
        Item: user,
      });
      expect(result).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user: User = { id: '1', name: 'John Doe', email: 'john@example.com' };
      const updatedUser: User = { id: '1', name: 'Jane Smith', email: 'jane@example.com' };
      const updateSpy = jest.spyOn(documentClient, 'update').mockReturnValue({
        promise: jest.fn().mockResolvedValue({ Attributes: updatedUser }),
      } as any);

      const result = await service.updateUser('1', updatedUser);

      expect(updateSpy).toHaveBeenCalledWith({
        TableName: 'users',
        Key: { id: '1' },
        UpdateExpression: 'set #name = :name, email = :email, #password = :password',
        ExpressionAttributeNames: {
          '#name': 'name',
          '#password': 'password',
        },
        ExpressionAttributeValues: {
          ':name': updatedUser.name,
          ':email': updatedUser.email,
        },
        ReturnValues: 'ALL_NEW',
      });
      expect(result).toEqual(updatedUser);
    });

    it('should return undefined if user does not exist', async () => {
      const updatedUser: User = { id: '1', name: 'Jane Smith', email: 'jane@example.com' };
      const updateSpy = jest.spyOn(documentClient, 'update').mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      } as any);

      const result = await service.updateUser('1', updatedUser);

      expect(updateSpy).toHaveBeenCalledWith({
        TableName: 'users',
        Key: { id: '1' },
        UpdateExpression: 'set #name = :name, email = :email',
        ExpressionAttributeNames: {
          '#name': 'name',
        },
        ExpressionAttributeValues: {
          ':name': updatedUser.name,
          ':email': updatedUser.email,
        },
        ReturnValues: 'ALL_NEW',
      });
      expect(result).toBeUndefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const deleteSpy = jest.spyOn(documentClient, 'delete').mockReturnValue({
        promise: jest.fn().mockResolvedValue({}),
      } as any);

      await service.deleteUser('1');

      expect(deleteSpy).toHaveBeenCalledWith({
        TableName: 'users',
        Key: { id: '1' },
      });
    });
  });
});
