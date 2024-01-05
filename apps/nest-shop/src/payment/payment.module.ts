import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PaymentController } from "./payment.controller";


@Module({
    imports: [
        ClientsModule.register([
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
        ])
    ],
    controllers: [PaymentController],
    providers: []
})
export class PaymentModule { }