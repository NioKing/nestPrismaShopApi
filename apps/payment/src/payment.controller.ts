import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ClientKafka, Ctx, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { map } from 'rxjs';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService,
    @Inject('CART_MICROSERVICE') private readonly cartClient: ClientKafka) { }


  @MessagePattern('get.checkout')
  getCheckout(@Payload() userId: string) {
    try {
      return this.paymentService.checkout(userId);
    } catch(error) {
      return error
    }

  }

}
