import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRODUCTS_MICROSERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get<string>('RMQ_URL')}`],
            queue: 'products_queue',
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [ProductController],
  providers: []
})
export class ProductModule {}
