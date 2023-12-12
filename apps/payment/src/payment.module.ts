import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { StripeModule } from './stripe.module';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PAYMENT_MICROSERVICE',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'payment',
          brokers: ['localhost:9092']
        },
        consumer: {
          groupId: 'payment-consumer'
        }
      }
    },
  ]),
  ConfigModule.forRoot({
    envFilePath: 'apps/payment/.env'
  }),
    StripeModule.forRoot(process.env.STRIPE_SECRET_KEY, {apiVersion: '2023-10-16'})
],
  controllers: [PaymentController],
  providers: [PaymentService, PrismaService],
})
export class PaymentModule {}
