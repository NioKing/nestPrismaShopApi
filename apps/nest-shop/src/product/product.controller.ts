import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, Query, UseInterceptors, OnModuleInit, CacheTTL } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto';
import { isPublic } from '../user/decorators/is-public-route.decorator';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Inject, UploadedFile } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('products')
export class ProductController implements OnModuleInit {
  constructor(
    @Inject('PRODUCTS_MICROSERVICE') private readonly client: ClientKafka
  ) { }


  async onModuleInit() {
    this.client.subscribeToResponseOf('get.products')
    this.client.subscribeToResponseOf('create.product')
    this.client.subscribeToResponseOf('get.product')
    this.client.subscribeToResponseOf('update.product')
    this.client.subscribeToResponseOf('delete.product')
    await this.client.connect()
  }

  @CacheKey('all_products')
  @isPublic()
  @Get()
  findAll(@Query('offset') skip?: string, @Query('limit') take?: string): Observable<Product[]> {
    if (!skip && !take) {
      return this.client.send('get.products', '')
    }
    else {
      return this.client.send('get.products', { skip, take })
    }

  }

  @CacheKey('product')
  @CacheTTL(5)
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: number): Observable<Product> {
    return this.client.send('get.product', id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Observable<Product> {
    return this.client.send('create.product', createProductDto)
  }


  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Observable<Product> {
    return this.client.send('update.product', { id, updateProductDto });
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<Product> {
    return this.client.send('delete.product', id);
  }

}
