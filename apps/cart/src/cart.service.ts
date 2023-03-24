import { PrismaService } from '@app/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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

}
