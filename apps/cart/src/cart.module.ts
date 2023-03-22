import { PrismaService } from '@app/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

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
  providers: [CartService, PrismaService],
})
export class CartModule {}
