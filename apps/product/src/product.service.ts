import { PrismaService } from '@app/common/prisma/prisma.service';
import { CreateProductDto } from '@app/common/product/dto/create-product.dto';
import { UpdateProductDto } from '@app/common/product/dto/update-product.dto';
import { Product } from '@app/common/product/entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  create(createProductDto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        description: createProductDto.description,
        image: createProductDto.image,
        price: createProductDto.price,
        title: createProductDto.title,
        categories: {
          connect: {
            id: createProductDto.categoryId
          }
        }
      }, include: {
        categories: true,
        carts: true
      }
    }
    )
  }

  findAll(): Promise<Array<Product>> {
    return this.prisma.product.findMany({
      include: {
        categories: true,
        carts: true
      }
    })
  }

  findAllPaginated(params: {
    skip?: number,
    take?: number
  }): Promise<Array<Product>> {

    const { skip, take } = params

    if (isNaN(skip)) {
      return this.prisma.product.findMany({
        take,
        include: {
          categories: true
        }
      })
    }
    if (isNaN(take)) {
      return this.prisma.product.findMany({
        skip,
        include: {
          categories: true
        }
      })
    }
    else {
      return this.prisma.product.findMany({
        skip, take, include: {
          categories: true
        }
      })
    }
  }

  async findOne(id: number): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: {
        id
      },
      include: {
        categories: true,
        carts: true
      }
    })
  }

  update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: {
        id
      }, data: updateProductDto
    })
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } })
  }
}
