import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CategoryModule } from './category.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


  async function bootstrap() {
    const configService = new ConfigService()
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(CategoryModule, {
      transport: Transport.RMQ,
      options: {
        urls: [`${configService.get<string>('RMQ_URL')}`],
        queue: 'category_queue',
      },
    })
    await app.listen();
  }
bootstrap();
