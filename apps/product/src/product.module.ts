import { PrismaService } from '@app/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

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
        // producerOnlyMode: true
        consumer: {
          groupId: 'products-consumer'
        }
      }
    }
  ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
