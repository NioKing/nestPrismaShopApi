import { Controller, Get, Post, Body, Patch, Param, Delete, CacheKey, CacheTTL } from '@nestjs/common';
import { CurrentUserId } from '../user/decorators/current-user-id.decorator';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() userId: string) {
    return this.cartService.create(userId);
  }
  
  @CacheKey('user_cart')
  @CacheTTL(10)
  @Get()
  findUserCart(@CurrentUserId() userId: string) {
    return this.cartService.findUserCart(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
