import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import helmet from 'helmet';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  const config = new DocumentBuilder()
  .setTitle('Shop API')
  .setVersion('1.0')
  .setBasePath('api')
  .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.enableCors({credentials: true})
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
