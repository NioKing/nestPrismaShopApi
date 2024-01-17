import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'CATEGORY_MICROSERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'category',
    //         brokers: ['localhost:9092']
    //       },
    //       consumer: {
    //         groupId: 'category-consumer'
    //       }
    //     }
    //   }
    // ])
    ClientsModule.register([
      {
        name: 'CATEGORY_MICROSERVICE',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://localhost:5672'],
          urls: ['amqp://rabbitmq:5672'],
          queue: 'category_queue',
        },
      },
    ])
  ],
  controllers: [CategoryController],
  providers: []
})
export class CategoryModule {}
