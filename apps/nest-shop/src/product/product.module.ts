import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
          urls: ['amqp://rabbitmq:5672'],
          queue: 'products_queue',
        },
      },
    ])
  ],
  controllers: [ProductController],
  providers: []
})
export class ProductModule {}
