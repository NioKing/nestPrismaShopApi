import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, Query, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto';
import { isPublic } from '../user/decorators/is-public-route.decorator';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UploadedFile } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // @Post()
  // @UseInterceptors(FileInterceptor('image', {
  //   dest: './uploads'
  // }))
  // create(@Body() createProductDto: CreateProductDto ,@UploadedFile() file: Express.Multer.File) {
  //   return this.productService.create(createProductDto, file.filename);
  // }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
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
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Product> {
    return this.productService.remove(id);
  }
}
