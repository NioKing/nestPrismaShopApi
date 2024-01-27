import { NestFactory } from '@nestjs/core';
import { SupportModule } from './support.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SupportModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get<string>('RMQ_URL')}`],
      queue: 'products_queue'
    }
  })
  await app.listen();
}
bootstrap();