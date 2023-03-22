import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryService } from './category.service';

interface updateCategory {
  id: string
  categoryUpdateInput: UpdateCategoryDto
}

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('get.categories')
  findAll() {
    return this.categoryService.findAll()
  }

  @MessagePattern('get.category')
  findOne(@Payload() id: string) {
    return this.categoryService.findOne(+id)
  }

  @MessagePattern('create.category')
  createCategory(@Payload() category: CreateCategoryDto) {
    return this.categoryService.create(category)
  }

  @MessagePattern('update.category')
  updateCategory(@Payload() updateCategory: updateCategory) {
    let category = updateCategory.categoryUpdateInput
    return this.categoryService.update(+updateCategory.id, category)
  }

  @MessagePattern('delete.category')
  deleteCatergory(@Payload() id: string) {
    return this.categoryService.remove(+id)
  }
  
}
