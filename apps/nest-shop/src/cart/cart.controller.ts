import { CurrentUserId } from '@app/common/auth/decorators/current-user-id.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, CacheTTL, Inject, OnModuleInit, HttpException } from '@nestjs/common';
import { ClientKafka, ClientRMQ } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

@ApiTags('carts')
@Controller('carts')
export class CartController {
  constructor(
    @Inject('CART_MICROSERVICE') private readonly client: ClientRMQ
  ) { }

  @Post()
  create(@Body() userId: string) {
    return this.client.send('create.cart', userId);
  }

  @CacheKey('user_cart')
  @CacheTTL(10)
  @Get()
  findUserCart(@CurrentUserId() userId: string) {
    return this.client.send('find.user.cart', userId)
  }

  @Post('add')
  addtoCart(@CurrentUserId() userId: string, @Body() productId: number) {
    return this.client.send('add.to.cart', { userId, productId })
  }

}
