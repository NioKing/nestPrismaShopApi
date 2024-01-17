import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Category } from '@prisma/client';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, PrismaService],
    }).compile();

    categoryController = app.get<CategoryController>(CategoryController);
    categoryService = app.get<CategoryService>(CategoryService)
  });

  describe('find all categories', () => {
    it('should return all categories', async () => {
      const categories = categoryService.findAll()
      jest.spyOn(categoryService, 'findAll').mockImplementation(() => Promise.resolve(categories))

      const result = await categoryController.findAll()

      expect(result).toEqual(categories)
    })
  }),
    it('should match type', async () => {
      const category = {
        'id': 1,
        'categoryName': 'category name'
      }

      jest.spyOn(categoryService, 'findOne').mockImplementation(() => Promise.resolve(category))
      
      // const res = await categoryController.findOne(1)
    })
});
