import { PrismaService } from '@app/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'SEARCH_MICROSERVICE',
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://rabbitmq:5672'],
        queue: 'search-queue'
      }
    }
  ]),
ConfigModule.forRoot({
  envFilePath: 'apps/product/.env'
})
  ],
controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule { }
