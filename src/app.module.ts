import { Module } from '@nestjs/common';
import { FavoritemoviesModule } from './favoritemovies/favoritemovies.module';
import { ConfigAppModule } from './config/config.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigAppModule, 
    FavoritemoviesModule,
    ConfigModule.forRoot(),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get('MONGODB_URI'),
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //     useCreateIndex: true,
    //     useFindAndModify: false,
    //   }),
    // }),
    AuthModule,
    UsersModule,
  ]
})
export class AppModule {}
