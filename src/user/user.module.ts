import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '2d'
    }
  })]
})
export class UserModule {}
