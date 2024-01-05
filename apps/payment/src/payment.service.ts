import { Cart } from '@app/common/cart/entities/cart.entity';
import { Inject, Injectable, OnModuleInit, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class PaymentService implements OnModuleInit {

  constructor(private config: ConfigService, @Inject('STRIPE_CLIENT') private stripe: Stripe,
    @Inject('CART_MICROSERVICE') private readonly cartClient: ClientKafka,) {
  }

  async onModuleInit() {
    this.cartClient.subscribeToResponseOf('find.user.cart')

    await this.cartClient.connect()
  }

  async checkout(userId: string) {
    let price = 0
    this.cartClient.send('find.user.cart', userId).subscribe((v: Cart): void  => {
      for(let i = 0; i < v.products.length; i++) {
        price += +v.products[i].price
      }
      console.log(v)
    })
    return this.stripe.paymentIntents.create({
      amount: price * 100,
      currency: 'usd',
      payment_method_types: ['card']
    })
  }

}
