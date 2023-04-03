import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`localhost:9092`],
      },
      consumer: {
        groupId: 'notifications-consumer'
      }
    }
  }
  )
  await app.listen();
}
bootstrap();

