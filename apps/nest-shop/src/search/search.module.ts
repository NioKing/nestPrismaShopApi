import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchController } from './search.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'SEARCH_MICROSERVICE',
                transport: Transport.RMQ,
                options: {
                    // urls: ['amqp://localhost:5672'],
                    urls: ['amqp://rabbitmq:5672'],
                    queue: 'search_queue',
                },
            },
        ])
    ],
    controllers: [SearchController],
    providers: []
})
export class SearchModule { }
