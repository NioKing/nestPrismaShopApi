import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { Prisma } from '@prisma/client';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'CART_MICROSERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'cart',
    //         brokers: ['localhost:9092']
    //       },
    //       consumer: {
    //         groupId: 'cart-consumer'
    //       },

    //     }
    //   }
    // ])
    ClientsModule.register([
      {
        name: 'CART_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
          urls: ['amqp://rabbitmq:5672'],
          queue: 'cart_queue',
        },
      },
    ])
  ],
  controllers: [CartController],
  providers: []
})
export class CartModule {}
