import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { isPublic } from '../user/decorators/is-public-route.decorator';
import { UpdateProductDto } from './dto/update-product.dto';

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
  findAll(@Query('offset') skip?: string, @Query('limit') take?: string): Promise<Product[]> {
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
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: Prisma.ProductUpdateInput): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Product> {
    return this.productService.remove(id);
  }
}
