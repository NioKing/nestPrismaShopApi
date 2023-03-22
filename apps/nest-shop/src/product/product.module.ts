import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaService } from '../prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
          // producerOnlyMode: true
          consumer: {
            groupId: 'products-consumer'
          }
        }
      }
    ])
  ],
  controllers: [ProductController],
  providers: [PrismaService]
})
export class ProductModule {}
