import { PrismaService } from '@app/common/prisma/prisma.service';
import toTitleCase from '@app/common/utils/toTitleCase';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) { }


  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: {
        categoryName: toTitleCase(createCategoryDto.categoryName).trim(),
        // product: {
        //   connect: {
        //     id: createCategoryDto.productId
        //   }
        // }
      },
      include: {
        products: true
      }
    })
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        products: true
      }
    })
  }

  findOne(id: number): Promise<Category> {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        products: true
      }
    })
  }

  update(id: number, CategoryUpdateInput: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({ where: { id }, data: CategoryUpdateInput })
  }

  remove(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
