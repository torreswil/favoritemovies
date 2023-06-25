import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';

global['fetch'] = require('node-fetch');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  await app.listen(3000);
}
bootstrap();
