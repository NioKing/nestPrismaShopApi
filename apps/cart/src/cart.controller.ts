import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @MessagePattern('create.cart')
  createCart(@Payload() userId: string) {
    return this.cartService.create(userId)
  }

  @EventPattern('create.user.cart')
  async createUserCart(@Payload() userId: string) {
    return this.cartService.create(userId)
  }

  @MessagePattern('find.user.cart')
  getUserCart(@Payload() userId: string) {
    return this.cartService.findUserCart(userId)
  }

}
