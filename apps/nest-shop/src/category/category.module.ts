import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATEGORY_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'category',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'category-consumer'
          }
        }
      }
    ])
  ],
  controllers: [CategoryController],
  providers: []
})
export class CategoryModule {}
