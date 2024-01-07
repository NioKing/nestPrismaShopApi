import { PrismaService } from '@app/common/prisma/prisma.service';
import { CreateProductDto } from '@app/common/product/dto/create-product.dto';
import { UpdateProductDto } from '@app/common/product/dto/update-product.dto';
import { Product } from '@app/common/product/entities/product.entity';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientRMQ } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    @Inject('SEARCH_MICROSERVICE') private readonly searchClient: ClientRMQ,
    private readonly configService: ConfigService
    ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    this.searchClient.emit('create.record', {
      index: this.configService.get<string>('ELASTIC_INDEX'),
      body: createProductDto
    })
    if(createProductDto.categoryId) {
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
        }, 
        include: {
          categories: true,
          carts: true
        }
      }
      )
    }
    return this.prisma.product.create({
      data: createProductDto, 
      include: {
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

  async searchForProduct(query: string) {
    return this.prisma.$queryRawUnsafe(`SELECT * FROM "Product" WHERE "title" ILIKE '%${query}%'`)
    // return this.prisma.product.findMany({
    //   where: {
    //     title: {
    //       search: query,
    //       mode: 'insensitive'
    //     }
    //   }
    // })
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
