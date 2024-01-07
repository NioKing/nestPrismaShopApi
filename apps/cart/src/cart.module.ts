import { PrismaService } from '@app/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'payment_queue',
        },
      },
    ])
  ],
  controllers: [CartController],
  providers: [CartService, PrismaService],
})
export class CartModule {}
