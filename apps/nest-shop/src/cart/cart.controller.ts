import { CurrentUserId } from '@app/common/auth/decorators/current-user-id.decorator';
import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, CacheTTL, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('carts')
@Controller('carts')
export class CartController implements OnModuleInit {
  constructor(
    @Inject('CART_MICROSERVICE') private readonly client: ClientKafka
  ) {}
  
  
  async onModuleInit() {
    this.client.subscribeToResponseOf('create.cart')
    this.client.subscribeToResponseOf('find.user.cart')
    
    await this.client.connect()
  }

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartService.update(+id, updateCartDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.cartService.remove(+id);
  // }
}
