import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';

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
          }
        }
      }
    ]),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => ({
        node: configService.get<string>('ELASTIC_NODE'),
        auth: {
          username: configService.get<string>('ELASTIC_USERNAME'),
          password: configService.get<string>('ELASTIC_PASSWORD')
        },
        maxRetries: 10,
        requestTimeout: 60000
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: "apps/search/.env"
    }),
    ScheduleModule.forRoot()
  ],
  controllers: [SearchController],
  providers: [SearchService, PrismaService],
})
export class SearchModule {
  
  
  constructor(
    private searchService: SearchService
  ){}
  
  
  // async onModuleInit() {
  //   await this.searchService.createIndex(index)
  // }
}
