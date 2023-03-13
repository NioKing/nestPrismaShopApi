import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService]
})
export class CartModule {}
