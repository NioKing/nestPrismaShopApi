import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { CartService } from './cart.service';

@Controller()
export class CartController {
  constructor(
    private readonly cartService: CartService, 
    @Inject('CART_MICROSERVICE') private cartClient: ClientKafka
    ) { }


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
