import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentModule } from './payment.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PaymentModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`localhost:9092`],
      },
      consumer: {
        groupId: 'payment-consumer'
      }
    }
  }
  )
  await app.listen();
}
bootstrap();
