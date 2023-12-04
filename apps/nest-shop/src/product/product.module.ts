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
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'products',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'products-consumer'
          }
        }
      }
    ])
  ],
  controllers: [ProductController],
  providers: []
})
export class ProductModule {}
