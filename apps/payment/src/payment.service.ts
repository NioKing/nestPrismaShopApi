import { Inject, Injectable, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {

  constructor(private config: ConfigService, @Inject('STRIPE_CLIENT') private stripe: Stripe) {
  }

  checkout() {

  }

}
