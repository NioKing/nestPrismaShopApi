import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';

  async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(CategoryModule, {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'category_queue',
      }
    })
    await app.listen();
  }
bootstrap();
