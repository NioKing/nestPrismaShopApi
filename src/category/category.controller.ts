import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { isPublic } from '../user/decorators/is-public-route.decorator';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto';


@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @CacheKey('all_categories')
  @isPublic()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @CacheKey('category')
  @isPublic()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() CategoryUpdateInput: UpdateCategoryDto) {
    return this.categoryService.update(id, CategoryUpdateInput);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.categoryService.remove(id);
  }
}
