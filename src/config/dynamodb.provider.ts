import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class DynamoDBProvider {
    public readonly client: DynamoDB.DocumentClient;
    public readonly mapper: any;

    constructor(private readonly configService: ConfigService) {
        const awsConfig = {
            region: this.configService.get<string>('AWS_REGION'),
            accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          };
        this.client = new DynamoDB.DocumentClient(awsConfig);

        this.mapper = new DataMapper({
            client: new DynamoDB({ region: awsConfig.region }),
        });
    }
}