import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SearchModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'search',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'search-consumer'
      }
    }
  }
  )
  await app.listen();
}
bootstrap();
