import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProductModule, {
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://localhost:5672'],
      urls: ['amqp://rabbitmq:5672'],
      queue: 'products_queue'
    }
  })
  await app.listen();
}
bootstrap();
