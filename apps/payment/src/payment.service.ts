import { Cart } from '@app/common/cart/entities/cart.entity';
import { Inject, Injectable, OnModuleInit, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientKafka, ClientRMQ, Payload } from '@nestjs/microservices';
import { lastValueFrom, map } from 'rxjs';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

  constructor(private config: ConfigService, @Inject('STRIPE_CLIENT') private stripe: Stripe,
    @Inject('CART_MICROSERVICE') private readonly cartClient: ClientRMQ,
    @Inject('AUTH_MICROSERVICE') private readonly userClient: ClientRMQ,) {
  }


  async checkout(userId: string) {
    let price = 0
    const products = await lastValueFrom(this.cartClient.send('find.user.cart', userId).pipe(map(v => v.products))) as any[]
    const userEmail = await lastValueFrom(this.userClient.send('find.current.user', userId).pipe(map(v => v.email))) as string
    for (let i = 0; i < products.length; i++) { 
      price += +products[i].price
    }
    return this.stripe.paymentIntents.create({
      amount: +price.toFixed(2) * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      receipt_email: userEmail
    })
  }

  confirmPayment(paymentId: string) {
    // invoke if payment status has changed
    // return this.stripe.paymentIntents.confirm(paymentId)

  }

}
