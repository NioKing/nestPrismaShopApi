import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { AccessTokenStrategy } from './strategies/at.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [RefreshTokenStrategy, AccessTokenStrategy],
  imports: [
    JwtModule.register({}),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_MICROSERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get<string>('RMQ_URL')}`],
            queue: 'auth_queue',
          }
        }),
        inject: [ConfigService]
      },
      {
        name: 'NOTIFICATIONS_MICROSERVICE',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get<string>('RMQ_URL')}`],
            queue: 'notifications_queue',
          }
        }),
        inject: [ConfigService]
      }
      
    ])
  ]
})
export class UserModule { }
