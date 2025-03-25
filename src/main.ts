import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(configService.get<number>('PORT'));
  console.log(
    `Server running on http://localhost:${configService.get<number>('PORT')}`,
  );
}
bootstrap();
