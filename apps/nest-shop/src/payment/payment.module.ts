import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PaymentController } from "./payment.controller";
import { ConfigService } from "@nestjs/config";


@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'PAYMENT_MICROSERVICE',
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`${configService.get<string>('RMQ_URL')}`],
                        queue: 'payment_queue',
                    }
                }),
                inject: [ConfigService]
            }
        ])
    ],
    controllers: [PaymentController],
    providers: []
})
export class PaymentModule { }