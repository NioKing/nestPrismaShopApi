import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { isPublic } from '../user/decorators/is-public-route.decorator';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @CacheKey('all_products')
  @isPublic()
  @Get()
  findAll(@Query('offset') skip?: string, @Query('limit') take?: string) {
    if (!skip && !take) {
      return this.productService.findAll()
    }
    else {
      return this.productService.findAllPaginated({ skip: +skip, take: +take });
    }

  }

  @CacheKey('product')
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: Prisma.ProductUpdateInput) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
