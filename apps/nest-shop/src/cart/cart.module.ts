import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { Prisma } from '@prisma/client';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CART_MICROSERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get<string>('RMQ_URL')}`],
            queue: 'cart_queue',
          },
        }),
        inject: [ConfigService],
      },
    ])
  ],
  controllers: [CartController],
  providers: []
})
export class CartModule {}
