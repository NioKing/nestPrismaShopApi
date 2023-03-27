import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, Query, UseInterceptors, OnModuleInit, CacheTTL } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Inject, UploadedFile } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Product } from '@app/common/product/entities/product.entity';
import { CreateProductDto } from '@app/common/product/dto/create-product.dto';
import { UpdateProductDto } from '@app/common/product/dto/update-product.dto';
import { isPublic } from '@app/common/auth/decorators/is-public-route.decorator';
import { ApiCreatedResponse, ApiHeader, ApiHeaders, ApiOkResponse, ApiOperation, ApiResponse, ApiTags,  } from '@nestjs/swagger';

@ApiTags('products')
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

  @ApiResponse({
    type: Product,
    isArray: true
  })
  @ApiOperation({
    summary: 'Get all products'
  })
  @CacheKey('all_products')
  @isPublic()
  @Get()
  findAll(@Query('offset') skip?: string, @Query('limit') take?: string): Observable<Product[]> {
    return this.client.send('get.products', { skip, take })
  }

  @ApiResponse({
    type: Product
  })
  @ApiOperation({
    summary: 'Get product by id'
  })
  @CacheKey('product')
  @CacheTTL(5)
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: number): Observable<Product> {
    return this.client.send('get.product', id);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Access token'
  })
  @ApiResponse({
    description: 'Product has been created',
    type: Product
  })
  @ApiOperation({
    summary: 'Create product'
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto): Observable<Product> {
    return this.client.send('create.product', createProductDto)
  }


  @ApiHeader({
    name: 'Authorization',
    description: 'Access token'
  })
  @ApiResponse({
    description: 'Product has been updated',
    type: Product
  })
  @ApiOperation({
    summary: 'Update product'
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Observable<Product> {
    return this.client.send('update.product', { id, updateProductDto });
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Access token'
  })
  @ApiResponse({
    description: 'Product has been removed',
    type: Product
  })
  @ApiOperation({
    summary: "Delete product"
  })
  @Delete(':id')
  remove(@Param('id') id: number): Observable<Product> {
    return this.client.send('delete.product', id);
  }

}
