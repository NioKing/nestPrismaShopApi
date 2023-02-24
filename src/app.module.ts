import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './user/decorators/guards/at.guard';

@Module({
  imports: [ProductModule, CategoryModule, CartModule, UserModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  }],
})
export class AppModule { }
