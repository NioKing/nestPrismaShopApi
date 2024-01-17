import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PaymentController } from "./payment.controller";


@Module({
    imports: [
        // ClientsModule.register([
        //     {
        //         name: 'PAYMENT_MICROSERVICE',
        //         transport: Transport.KAFKA,
        //         options: {
        //             client: {
        //                 clientId: 'payment',
        //                 brokers: ['localhost:9092']
        //             },
        //             consumer: {
        //                 groupId: 'payment-consumer'
        //             }
        //         }
        //     },
        // ])
        ClientsModule.register([
            {
                name: 'PAYMENT_MICROSERVICE',
                transport: Transport.RMQ,
                options: {
                    // urls: ['amqp://localhost:5672'],
                    urls: ['amqp://rabbitmq:5672'],
                    queue: 'payment_queue',
                },
            },
        ])
    ],
    controllers: [PaymentController],
    providers: []
})
export class PaymentModule { }