import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  create(createProductDto: Prisma.ProductCreateInput): Promise<Prisma.ProductCreateInput> {
    return this.prisma.product.create({
      data: createProductDto
    })
  }

  findAll() {
    return this.prisma.product.findMany()
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({
      where: {
        id
      }
    })
  }

  update(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.prisma.product.update({
      where: {
        id
      }, data: updateProductDto
    })
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } })
  }
}
