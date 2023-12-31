import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { AppConfig } from './app.config';
import { AuthConfig } from './auth.config';
import { ConfigService } from './config.service';
import { MongoConfig } from './mongo.config';

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    ConfigService,
    AppConfig,
    AuthConfig,
    MongoConfig,
  ],
  exports: [
    AppConfig,
    MongoConfig,
    AuthConfig,
  ],
})
export class ConfigModule {}
