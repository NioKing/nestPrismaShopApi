import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { CartService } from '../cart/cart.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CartService],
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '2d'
    }
  })]
})
export class UserModule {}
