import { PrismaService } from '@app/common/prisma/prisma.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class CartService {

  constructor(private prisma: PrismaService) { }

  create(userId: string) {
    return this.prisma.cart.create({
      data: {
        userId: userId
      }
    })
  }

  findUserCart(userId: string) {
    return this.prisma.cart.findUnique({
      include: {
        products: true
      },
      where: {
        userId: userId
      }
    })
  }

  addToCart(userId: string, productId: number) {
    return this.prisma.cart.update({
      where: {
        userId: userId
      },
      data: {
        products: {
          connect: {
            id: productId
          }
        }
      }
    })
  }

}
