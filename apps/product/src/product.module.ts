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
    },
    {
      name: 'SEARCH_MICROSERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'search',
          brokers: ['localhost:9092']
        },
        consumer: {
          groupId: 'search-consumer'
        }
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
export class ProductModule {}
