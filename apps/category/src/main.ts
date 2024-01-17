import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';
import { Module } from '@nestjs/common';


  async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(CategoryModule, {
      transport: Transport.RMQ,
      options: {
        // urls: ['amqp://localhost:5672'],
        urls: ['amqp://rabbitmq:5672'],
        queue: 'category_queue',
      },
    })
    await app.listen();
  }
bootstrap();
