import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isPublic } from '../user/decorators/is-public-route.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @CacheKey('all_categories')
  @isPublic()
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @CacheKey('category')
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() CategoryUpdateInput: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(id, CategoryUpdateInput);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<Category> {
    return this.categoryService.remove(id);
  }
}
