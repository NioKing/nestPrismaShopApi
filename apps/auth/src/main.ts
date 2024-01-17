import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
  //   transport: Transport.KAFKA
  //   , options: {
  //     client: {
  //       brokers: [`localhost:9092`],
  //     },
  //     consumer: {
  //       groupId: 'auth-consumer'
  //     }
  //   }
  // }
  // )
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://localhost:5672'],
      urls: ['amqp://rabbitmq:5672'],
      queue: 'auth_queue',
      
    }
  })
  await app.listen();
}
bootstrap();