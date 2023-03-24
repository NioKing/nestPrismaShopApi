import { CreateCategoryDto } from '@app/common/category/dto/create-category.dto';
import { UpdateCategoryDto } from '@app/common/category/dto/update-category.dto';
import { Category } from '@app/common/category/entities/category.entity';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';

interface updateCategory {
  id: string
  categoryUpdateInput: UpdateCategoryDto
}

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('get.categories')
  findAll(): Promise<Array<Category>> {
    return this.categoryService.findAll()
  }

  @MessagePattern('get.category')
  findOne(@Payload() id: string): Promise<Category> {
    return this.categoryService.findOne(+id)
  }

  @MessagePattern('create.category')
  createCategory(@Payload() category: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(category)
  }

  @MessagePattern('update.category')
  updateCategory(@Payload() updateCategory: updateCategory): Promise<Category> {
    let category = updateCategory.categoryUpdateInput
    return this.categoryService.update(+updateCategory.id, category)
  }

  @MessagePattern('delete.category')
  deleteCatergory(@Payload() id: string): Promise<Category> {
    return this.categoryService.remove(+id)
  }
  
}
