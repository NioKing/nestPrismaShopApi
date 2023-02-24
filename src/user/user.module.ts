import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { CartService } from '../cart/cart.service';
import { RefreshTokenStrategy } from './strategies/rt.strategy';
import { AccessTokenStrategy } from './strategies/at.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CartService, RefreshTokenStrategy, AccessTokenStrategy],
  imports: [
    JwtModule.register({})
]
})
export class UserModule {}
