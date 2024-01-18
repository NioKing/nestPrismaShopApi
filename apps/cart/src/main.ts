import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CartModule } from './cart.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService()
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CartModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get<string>('RMQ_URL')}`],
      queue: 'cart_queue'
    }
  })
  await app.listen();
}
bootstrap();
