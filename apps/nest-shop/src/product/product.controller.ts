import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, Query, UseInterceptors, OnModuleInit, CacheTTL } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Inject, Res, UploadedFile } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { ClientKafka, ClientRMQ } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Product } from '@app/common/product/entities/product.entity';
import { CreateProductDto } from '@app/common/product/dto/create-product.dto';
import { UpdateProductDto } from '@app/common/product/dto/update-product.dto';
import { isPublic } from '@app/common/auth/decorators/is-public-route.decorator';
import { ApiCreatedResponse, ApiHeader, ApiHeaders, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { Request, Response } from 'express'


@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    @Inject('PRODUCTS_MICROSERVICE') private readonly client: ClientRMQ
  ) { }


  @ApiResponse({
    type: Product,
    isArray: true
  })
  @ApiOperation({
    summary: 'Get all products'
  })
  @ApiQuery({
    name: 'offset',
    required: false
  })
  @ApiQuery({
    name: 'limit',
    required: false
  })
  @ApiQuery({
    name: 'query',
    required: false
  })
  @CacheKey('all_products')
  @CacheTTL(5)
  @isPublic()
  @Get()
  findAll(@Query('offset') skip?: string, @Query('limit') take?: string, @Query('query') query?: string): Observable<Product[]> {
    return this.client.send('get.products', { skip, take, query })
  }

  @isPublic()
  @CacheKey('product_image')
  @Get('pictures/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads/products' })
    // return filename
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
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req: Request, file: Express.Multer.File, cb: Function) => {
        const name = file.originalname.split('.')[0]
        const fileExtansion = file.originalname.split('.')[1]
        const newFileName = name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtansion
        cb(null, newFileName)
      }
    }),
    fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/) && file.size > 31457280) return cb(null, false)
      cb(null, true)
    }
  }))
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File): Observable<Product> {
    const imagePath = `http://localhost:3000/api/products/pictures/${file.filename}`
    createProductDto.image = imagePath
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
