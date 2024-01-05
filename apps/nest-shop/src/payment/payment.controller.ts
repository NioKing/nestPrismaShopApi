import { CurrentUserId } from "@app/common/auth/decorators/current-user-id.decorator";
import { isPublic } from "@app/common/decorators/is-public-route.decorator";
import { Body, CacheInterceptor, Controller, Get, Inject, OnModuleInit, Post, UseInterceptors } from "@nestjs/common";
import { ClientKafka, Payload } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('payment')
@Controller('payment')
export class PaymentController implements OnModuleInit {
    constructor(
        @Inject('PAYMENT_MICROSERVICE') private readonly client: ClientKafka,
    ) { }

    async onModuleInit() {
        this.client.subscribeToResponseOf('get.checkout')
        // this.client.subscribeToResponseOf('find.user.cart')
        await this.client.connect()
    }

    @Post()
    getCheckout(@CurrentUserId() id: string) {
        return this.client.send('get.checkout', id)
    }
}