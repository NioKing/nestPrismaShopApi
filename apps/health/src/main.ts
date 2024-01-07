import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HealthModule } from './health.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HealthModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'health_queue'
    }
  })
  await app.listen();
}
bootstrap();
