import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SearchModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'search_queue'
    }
  })
  await app.listen();
}
bootstrap();
