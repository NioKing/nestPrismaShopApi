import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  
  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data: createCategoryDto
    })
  }

  findAll() {
    return this.prisma.category.findMany()
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({where: {id}})
  }

  update(id: number, CategoryUpdateInput: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({ where: { id }, data: CategoryUpdateInput })
  }

  remove(id: number) {
    return this.prisma.category.delete({where: {id}});
  }
}
