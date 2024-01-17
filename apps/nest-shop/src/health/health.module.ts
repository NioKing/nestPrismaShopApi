
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'HEALTH_MICROSERVICE',
                transport: Transport.RMQ,
                options: {
                    // urls: ['amqp://localhost:5672'],
                    urls: ['amqp://rabbitmq:5672'],
                    queue: 'health_queue',
                },
            },
        ])
    ],
    controllers: [HealthController],
    providers: [],
})
export default class HealthModule { }