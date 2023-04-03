import { KafkaModule } from '@app/common/kafka/kafka.module';
import { PrismaService } from '@app/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenStrategy } from './strategies/at.strategy';
import { RefreshTokenStrategy } from './strategies/rt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'auth-consumer'
          }
        }
      },
      {
        name: 'CART_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cart',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'cart-consumer'
          }
        }
      },
      {
        name: 'NOTIFICATIONS_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'notifications',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'notifications-consumer'
          }
        }
      }
    ],
    ),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({}),
    KafkaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
