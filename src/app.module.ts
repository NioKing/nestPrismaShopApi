import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ProductModule, CategoryModule, CartModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
