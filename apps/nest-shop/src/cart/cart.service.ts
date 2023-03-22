import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

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
        products: true,
        user: true
      },
      where: {
        userId: userId
      }
    })
  }

  findOne(id: string) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
