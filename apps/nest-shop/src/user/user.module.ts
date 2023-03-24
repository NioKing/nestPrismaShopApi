import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { AccessTokenStrategy } from './strategies/at.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UserController],
  providers: [RefreshTokenStrategy, AccessTokenStrategy],
  imports: [
    // JwtModule.register({}),
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
      }
    ])
]
})
export class UserModule {}
