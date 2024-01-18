import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SearchModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get<string>('RMQ_URL')}`],
      queue: 'search_queue'
    }
  })
  await app.listen();
}
bootstrap();
