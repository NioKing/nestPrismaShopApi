import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productService.create(createProductDto);
  }

  @CacheKey('all_products')
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @CacheKey('product')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: Prisma.ProductUpdateInput) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
