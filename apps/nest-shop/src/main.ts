import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({credentials: true})
  app.setGlobalPrefix('api')
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
