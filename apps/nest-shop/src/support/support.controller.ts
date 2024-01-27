import { CurrentUserWS } from "@app/common/auth/decorators/current-user-ws.decorator";
import { CurrentUser } from "@app/common/auth/decorators/current-user.decorator";
import { User } from "@app/common/auth/entities/user.entity";
import { Controller, ForbiddenException, Inject, OnModuleInit, UseGuards } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { lastValueFrom } from "rxjs";
import { Server, Socket } from 'socket.io'

@ApiTags('support')
@WebSocketGateway()
export class SupportController implements OnGatewayConnection, OnModuleInit {
    @WebSocketServer()
    server: Server
    constructor(
        @Inject('SUPPORT_MICROSERVICE') private supportClient: ClientRMQ,
        @Inject('AUTH_MICROSERVICE') private authClient: ClientRMQ,
    ) { }


    onModuleInit() {
    }
    
    
    @SubscribeMessage('events')
    handleEvent(@MessageBody() data: any, @CurrentUserWS() user: any) {
        this.supportClient.emit('get.message', data)
        this.server.emit('events', data)
        console.log(user)
        return
    }

    async handleConnection(client: Socket, ...args: any[]) {
        try {
            const token = client.handshake.headers['authorization'].split(' ')[1]
            const user = await lastValueFrom(this.authClient.send('verify.token', token))
            console.log(user.email, ' has connected')
        } catch (error) {
            console.log('invalid user')
            return client.disconnect()
        }
    }

}