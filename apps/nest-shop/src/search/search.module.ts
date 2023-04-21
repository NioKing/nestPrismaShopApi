import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchController } from './search.controller';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'SEARCH_MICROSERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'search',
                        brokers: ['localhost:9092']
                    },
                    consumer: {
                        groupId: 'search-consumer'
                    },
                }
            }
        ])
    ],
    controllers: [SearchController],
    providers: []
})
export class SearchModule { }
