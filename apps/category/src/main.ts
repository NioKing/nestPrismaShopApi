import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';

  async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(CategoryModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`localhost:9092`],
        },
        consumer: {
          groupId: 'category-consumer'
        }
      }
    }
    )
    await app.listen();
  }
bootstrap();
