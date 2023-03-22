import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cart',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'cart-consumer'
          }
        }
      }
    ])
  ],
  controllers: [CartController],
  providers: [PrismaService]
})
export class CartModule {}
