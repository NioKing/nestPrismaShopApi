import { isPublic } from '@app/common/auth/decorators/is-public-route.decorator';
import { CreateCategoryDto } from '@app/common/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@app/common/category/dto/update-category.dto';
import { Category } from '@app/common/category/entities/category.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('categories')
@Controller('categories')
export class CategoryController implements OnModuleInit {
  constructor(
    @Inject('CATEGORY_MICROSERVICE') private readonly client: ClientKafka
    ) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('create.category')
    this.client.subscribeToResponseOf('get.categories')
    this.client.subscribeToResponseOf('get.category')
    this.client.subscribeToResponseOf('update.category')
    this.client.subscribeToResponseOf('delete.category')

    await this.client.connect()
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Observable<Category> {
    return this.client.send('create.category', createCategoryDto);
  }

  @CacheKey('all_categories')
  @isPublic()
  @Get()
  findAll(): Observable<Category[]> {
    return this.client.send('get.categories', '')
  }

  @CacheKey('category')
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: number): Observable<Category> {
    return this.client.send('get.category', id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() categoryUpdateInput: UpdateCategoryDto): Observable<Category> {
    return this.client.send('update.category', {id, categoryUpdateInput});
  }

  @Delete(':id')
  remove(@Param('id') id: number): Observable<Category> {
    return this.client.send('delete.category', id);
  }
}
