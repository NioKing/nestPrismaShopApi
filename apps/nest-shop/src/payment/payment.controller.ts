import { Controller, Inject, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('payment')
@Controller('payment')
export class PaymentController implements OnModuleInit{
    constructor(
        @Inject('PAYMENT_MICROSERVICE') private readonly client: ClientKafka
    ) { }

    async onModuleInit() {
        await this.client.connect()
    }
}