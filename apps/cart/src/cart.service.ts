import { PrismaService } from '@app/common/prisma/prisma.service';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class CartService {

  constructor(private prisma: PrismaService,
    @Inject('PAYMENT_MICROSERVICE') private paymentClient: ClientKafka,
    @Inject('CART_MICROSERVICE') private cartClient: ClientKafka
  ) { }


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

}
