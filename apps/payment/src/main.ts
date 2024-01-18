import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get<string>('RMQ_URL')}`],
      queue: 'payment_queue',
    }
  })
  await app.listen();
}
bootstrap();
