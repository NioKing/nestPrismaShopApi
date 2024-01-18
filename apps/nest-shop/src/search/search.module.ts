import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchController } from './search.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'SEARCH_MICROSERVICE',
                useFactory: async (configService: ConfigService) => ({
                    transport: Transport.RMQ,
                    options: {
                        urls: [`${configService.get<string>('RMQ_URL')}`],
                        queue: 'search_queue',
                    }
                }),
                inject: [ConfigService]
            }
        ])
    ],
    controllers: [SearchController],
    providers: []
})
export class SearchModule { }
