import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, OnModuleInit, Inject, OnApplicationShutdown, HttpStatus, HttpCode } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Client, ClientKafka, ClientRMQ, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { refreshTokenData } from '@app/common/interfaces/refresh-token.interface';
import { isPublic } from '@app/common/auth/decorators/is-public-route.decorator';
import { CreateUserDto } from '@app/common/auth/dto/create-user.dto';
import { Tokens } from '@app/common/auth/dto/tokens.type';
import { RtGuard } from '@app/common/auth/decorators/guards/rt.guard';
import { CurrentUserId } from '@app/common/auth/decorators/current-user-id.decorator';
import { CurrentUser } from '@app/common/auth/decorators/current-user.decorator';
import { User } from '@app/common/auth/entities/user.entity';
import { UpdateUserDto } from '@app/common/auth/dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@app/common/auth/decorators/roles.decorator';
import { Response } from 'express';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('user')
@Controller()
export class UserController {

  constructor(
    @Inject('AUTH_MICROSERVICE') private client: ClientRMQ,
    @Inject('NOTIFICATIONS_MICROSERVICE') private notifClient: ClientRMQ,
  ) { }


  @isPublic()
  @Post('register')
  @HttpCode(200)
  signUp(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) response: Response): Observable<Tokens> {
    if(response.statusCode === 200) this.notifClient.emit('send.welcome.email', createUserDto.email)
    return this.client.send('sign.up', createUserDto)
  }

  @isPublic()
  @Post('login')
  singIn(@Body() createUserDto: CreateUserDto): Observable<Tokens> {
    return this.client.send('sign.in', createUserDto)
  }

  @isPublic()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(@Body() refreshTokenData: refreshTokenData, @CurrentUserId() userId: string, @CurrentUser('rt') refreshToken: string): Observable<Tokens> {
    refreshTokenData = {
      userId,
      refreshToken
    }
    return this.client.send('refresh.tokens', refreshTokenData)
  }

  @Post('logout')
  logout(@CurrentUserId() userId: string): Observable<void> {
    return this.client.send('logout', userId)
  }

  @CacheKey('user')
  @CacheTTL(10)
  @Get('user')
  findCurrentUser(@CurrentUserId() userId: string): Observable<User> {
    return this.client.send('find.current.user', userId);
  }

  @Patch('user')
  update(@CurrentUserId() userId: string, @Body() updateUserDto: UpdateUserDto): Observable<User> {
    updateUserDto.id = userId
    return this.client.send('update.current.user', updateUserDto);
  }

  @Delete('user')
  remove(@CurrentUserId() id: string): Observable<User> {
    return this.client.send('delete.current.user', id)
  }

}
