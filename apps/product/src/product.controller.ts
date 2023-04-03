import { CreateProductDto } from '@app/common/product/dto/create-product.dto';
import { UpdateProductDto } from '@app/common/product/dto/update-product.dto';
import { Product } from '@app/common/product/entities/product.entity';
import { Controller, Get, Query } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';

interface params {
  skip: string,
  take: string,
  query: string
}


@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) { }


  @MessagePattern('get.products')
  async findAll(@Payload() params: params) {
    if (params.query) {
      return this.productService.searchForProduct(params.query)
    }
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

  @MessagePattern('search.product')
  searchForProduct(@Payload() query: string) {
    console.log(query)
    return this.productService.searchForProduct(query)
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
