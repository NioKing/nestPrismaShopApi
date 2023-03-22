import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, CacheTTL, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CurrentUserId } from '../user/decorators/current-user-id.decorator';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';

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
