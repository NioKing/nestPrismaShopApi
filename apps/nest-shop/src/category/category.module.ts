import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CATEGORY_MICROSERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get<string>('RMQ_URL')}`],
            queue: 'category_queue',
          },
        }),
        inject: [ConfigService],
      },
    ])
  ],
  controllers: [CategoryController],
  providers: []
})
export class CategoryModule {}
