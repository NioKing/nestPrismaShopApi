import { Cart } from '@app/common/cart/entities/cart.entity';
import { Inject, Injectable, OnModuleInit, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientRMQ, Payload } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

  constructor(private config: ConfigService, @Inject('STRIPE_CLIENT') private stripe: Stripe,
    @Inject('CART_MICROSERVICE') private readonly cartClient: ClientRMQ,) {
  }


  async checkout(userId: string) {
    let price = 0
    const data$ = this.cartClient.send('find.user.cart', userId).pipe(map(v => v.products))
    const products = await lastValueFrom(data$) as any[]
    for (let i = 0; i < products.length; i++) { 
      price += +products[i].price
    }
    return this.stripe.paymentIntents.create({
      amount: +price.toFixed(2) * 100,
      currency: 'usd',
      payment_method_types: ['card']
    })
    // if successful, emit message to cart to remove cart.products data
  }

}
