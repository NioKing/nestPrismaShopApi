import { PrismaService } from '@app/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

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
  ],
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService],
})
export class CategoryModule {}
