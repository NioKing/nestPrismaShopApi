
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'HEALTH_MICROSERVICE',
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`${configService.get<string>('RMQ_URL')}`],
                        queue: 'health_queue',
                    }
                }),
                inject: [ConfigService]
            }
        ])
    ],
    controllers: [HealthController],
    providers: [],
})
export default class HealthModule { }