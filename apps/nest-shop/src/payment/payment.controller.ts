import { CurrentUserId } from "@app/common/auth/decorators/current-user-id.decorator";
import { isPublic } from "@app/common/decorators/is-public-route.decorator";
import { Body, CacheInterceptor, Controller, Get, Inject, OnModuleInit, Post, UseInterceptors } from "@nestjs/common";
import { ClientKafka, ClientRMQ, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
    constructor(
        @Inject('PAYMENT_MICROSERVICE') private readonly client: ClientRMQ,
    ) { }

    @Post()
    getCheckout(@CurrentUserId() id: string) {
        return this.client.send('get.checkout', id)
    }
}