import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, CacheKey, CacheTTL, Logger, Inject, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { Tokens } from './types/tokens.type';
import { RtGuard } from './decorators/guards/rt.guard';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { CurrentUserId } from '@app/common/decorators/current-user-id.decorator';
import { isPublic } from '@app/common/decorators/is-public-route.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaMessage } from '@app/common/interfaces/kafka-message.interface';
import { refreshTokenData } from '@app/common/interfaces/refresh-token.interface';
import { use } from 'passport';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }


  @MessagePattern('sign.up')
  signUp(@Payload() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signUp(createUserDto)
  }

  @MessagePattern('sign.in')
  singIn(@Payload() createUserDto: CreateUserDto): Promise<Tokens> {
    return this.authService.signIn(createUserDto)
  }

  @MessagePattern('logout')
  logout(@Payload() userId: string): Promise<void> {
    return this.authService.logout(userId)
  }

  @MessagePattern('refresh.tokens')
  async refreshTokens(@Payload() message: refreshTokenData): Promise<Tokens> {
    return this.authService.refreshTokens(message.userId, message.refreshToken)
  }

  @MessagePattern('find.current.user')
  findCurrentUser(@Payload() userId: string) {
    return this.authService.findCurrentUser(userId);
  }

  @MessagePattern('update.current.user')
  update(@Payload() user: UpdateUserDto): Promise<User> {
    return this.authService.update(user.id, user);
  }

  @MessagePattern('delete.current.user')
  async remove(@Payload() id: string): Promise<string> {
    await this.authService.remove(id);
    return 'Account has been removed!'
  }
}
