import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get<string>('RMQ_URL')}`],
      queue: 'notifications_queue',
    }
  })
  await app.listen();
}
bootstrap();

