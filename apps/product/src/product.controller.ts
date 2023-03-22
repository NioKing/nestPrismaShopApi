import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Product } from '@prisma/client';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

interface params {
  skip: string,
  take: string
}

interface product {
  id: number,
  updateProductDto: UpdateProductDto
}

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @MessagePattern('get.products')
  async findAll(@Payload() params: params): Promise<Product[]> {
    if (!params.skip && !params.take) {
      return this.productService.findAll()
    }
    else {
      return this.productService.findAllPaginated({
        skip: +params.skip,
        take: +params.take
      })
    }
  }

  @MessagePattern('create.product')
  createProduct(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto)
  }


  @MessagePattern('get.product')
  findOne(@Payload() id: string) {
    return this.productService.findOne(+id)
  }

  @MessagePattern('update.product')
  updateProduct(@Payload() { id, updateProductDto }) {
    return this.productService.update(+id, updateProductDto)
  }

  @MessagePattern('delete.product')
  deleteProduct(@Payload() id: string) {
    return this.productService.remove(+id)
  }

}
