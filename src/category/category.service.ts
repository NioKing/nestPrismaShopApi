import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }

  
  create(createCategoryDto: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data: createCategoryDto,
      include: {
        product: true
      }
    })
  }

  findAll() {
    return this.prisma.category.findMany({
      include: {
        product: true
      }
    })
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        product: true
      }
})
  }

  update(id: number, CategoryUpdateInput: Prisma.CategoryUpdateInput) {
    return this.prisma.category.update({ where: { id }, data: CategoryUpdateInput })
  }

  remove(id: number) {
    return this.prisma.category.delete({where: {id}});
  }
}
