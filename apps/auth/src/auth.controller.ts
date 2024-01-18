import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards,Logger, Inject, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserId } from './decorators/current-user-id.decorator';
import { isPublic } from '@app/common/decorators/is-public-route.decorator';
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { refreshTokenData } from '@app/common/interfaces/refresh-token.interface';
import { CreateUserDto } from '@app/common/auth/dto/create-user.dto';
import { Tokens } from '@app/common/auth/dto/tokens.type';
import { UpdateUserDto } from '@app/common/auth/dto/update-user.dto';
import { User } from '@app/common/auth/entities/user.entity';
import { excludedUser } from '@app/common/auth/entities/excludedUser.entity';

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
  findCurrentUser(@Payload() userId: string): Promise<excludedUser> {
    return this.authService.findCurrentUser(userId);
  }

  @MessagePattern('update.current.user')
  update(@Payload() user: UpdateUserDto): Promise<excludedUser> {
    return this.authService.update(user.id, user);
  }

  @MessagePattern('delete.current.user')
  async remove(@Payload() id: string): Promise<string> {
    await this.authService.remove(id);
    return 'Account has been removed!'
  }
}
