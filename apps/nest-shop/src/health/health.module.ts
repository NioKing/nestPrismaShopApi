
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';

@Module({
    imports: [TerminusModule,
        ClientsModule.register([
            {
                name: 'HEALTH_MICROSERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'health',
                        brokers: ['localhost:9092']
                    },
                    consumer: {
                        groupId: 'health-consumer'
                    }
                }
            }
        ])
    ],
    controllers: [HealthController],
    providers: [],
})
export default class HealthModule { }