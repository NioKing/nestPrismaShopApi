import { Module } from "@nestjs/common";
import { SupportController } from "./support.controller";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'SUPPORT_MICROSERVICE',
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`${configService.get<string>('RMQ_URL')}`],
                        queue: 'support_queue',
                    }
                }),
                inject: [ConfigService]
            },
            {
                name: 'AUTH_MICROSERVICE',
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`${configService.get<string>('RMQ_URL')}`],
                        queue: 'auth_queue',
                    }
                }),
                inject: [ConfigService]
            }
        ])
    ],
    controllers: [],
    providers: [SupportController]
})
export class SupportModule {}