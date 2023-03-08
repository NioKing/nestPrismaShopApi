import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AtGuard } from './user/decorators/guards/at.guard';
import * as redisStore from 'cache-manager-redis-store';
import * as joi from 'joi'

@Module({
  imports: [ProductModule, CategoryModule, CartModule, UserModule, ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: joi.object({
      DATABASE_URL: joi.string().required(),
      AT_SECRET: joi.string().required(),
      RT_SECRET: joi.string().required(),
      REDIS_HOST: joi.string().required(),
      REDIS_PORT: joi.number().default(6379),
      REDIS_USERNAME: joi.string().required(),
      REDIS_PASSWORD: joi.string().required(),
      REDIS_TTL: joi.number().default(30)
    })
  }), CacheModule.registerAsync({
    isGlobal: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async(configService: ConfigService) => ({
      store: redisStore,
      host: configService.get<string>('REDIS_HOST_DEV'),
      // host: configService.get<string>('REDIS_HOST'),
      port: configService.get<number>('REDIS_PORT_DEV'),
      // username: configService.get<string>('REDIS_USERNAME'),
      // password: configService.get<string>('REDIS_PASSWORD'),
      ttl: configService.get<number>('REDIS_TTL')
    })
  })],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor
  }
],
})
export class AppModule { }
