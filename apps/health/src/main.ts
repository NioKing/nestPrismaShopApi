import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HealthModule } from './health.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HealthModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [`localhost:9092`],
      },
      consumer: {
        groupId: 'health-consumer'
      }
    }
  }
  )
  await app.listen();
}
bootstrap();
