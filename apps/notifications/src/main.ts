import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule, {
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://localhost:5672'],
      urls: ['amqp://rabbitmq:5672'],
      queue: 'notifications_queue',
    }
  })
  await app.listen();
}
bootstrap();

