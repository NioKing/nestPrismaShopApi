import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { AtGuard } from './user/decorators/guards/at.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({credentials: true})
  await app.listen(3000);
}
bootstrap();
