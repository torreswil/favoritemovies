import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBProvider {
  public readonly client: DynamoDB.DocumentClient;
    private readonly configService: ConfigService;
  constructor() {
    this.client = new DynamoDB.DocumentClient({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  }
}