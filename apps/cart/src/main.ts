import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CartModule } from './cart.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CartModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'cart_queue'
    }
  })
  await app.listen();
}
bootstrap();
