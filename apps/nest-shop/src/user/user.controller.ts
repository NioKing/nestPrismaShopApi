import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, CacheKey, CacheTTL, OnModuleInit, Inject, OnApplicationShutdown } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { Tokens } from './types/tokens.type';
import { RtGuard } from './decorators/guards/rt.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserId } from './decorators/current-user-id.decorator';
import { isPublic } from './decorators/is-public-route.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { refreshTokenData } from '@app/common/interfaces/refresh-token.interface';

@Controller()
export class UserController implements OnModuleInit {
  // @Client({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       clientId: 'auth',
  //       brokers: ['localhost:9092']
  //     },
  //     consumer: {
  //       groupId: 'auth-consumer'
  //     }
  //   }
  // })
  // client: ClientKafka

  constructor(
    @Inject('AUTH_MICROSERVICE') private client: ClientKafka
  ) { }

  async onModuleInit() {
    this.client.subscribeToResponseOf('sign.up')
    this.client.subscribeToResponseOf('sign.in')
    this.client.subscribeToResponseOf('refresh.tokens')
    this.client.subscribeToResponseOf('logout')
    this.client.subscribeToResponseOf('find.current.user')
    this.client.subscribeToResponseOf('update.current.user')
    this.client.subscribeToResponseOf('delete.current.user')
    await this.client.connect()
  }

  @isPublic()
  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<Observable<Tokens>> {
    return this.client.send('sign.up', createUserDto)
  }

  @isPublic()
  @Post('login')
  async singIn(@Body() createUserDto: CreateUserDto): Promise<Observable<Tokens>> {
    return this.client.send('sign.in', createUserDto)
  }

  @isPublic()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenData: refreshTokenData, @CurrentUserId() userId: string, @CurrentUser('rt') refreshToken: string): Promise<Observable<Tokens>> {
    refreshTokenData = {
      userId,
      refreshToken
    }
    return this.client.send('refresh.tokens', refreshTokenData)
  }

  @Post('logout')
  async logout(@CurrentUserId() userId: string): Promise<Observable<void>> {
    return this.client.send('logout', userId)
  }

  @CacheKey('user')
  @CacheTTL(10)
  @Get('user')
  async findCurrentUser(@CurrentUserId() userId: string): Promise<Observable<User>> {
    return this.client.send('find.current.user', userId);
  }

  @Patch('user')
  async update(@CurrentUserId() userId: string, @Body() updateUserDto: UpdateUserDto): Promise<Observable<User>> {
    updateUserDto.id = userId
    return this.client.send('update.current.user', updateUserDto);
  }

  @Delete('user')
  async remove(@CurrentUserId() id: string): Promise<Observable<User>> {
    return this.client.send('delete.current.user', id)
  }


  // @isPublic()
  // @Post('register')
  // async signUp(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
  //   return this.userService.signUp(createUserDto)
  // }

  // @isPublic()
  // @Post('login')
  // async singIn(@Body() createUserDto: CreateUserDto): Promise<Tokens> {
  //   return this.userService.signIn(createUserDto)
  // }

  // @Post('logout')
  // logout(@CurrentUserId() userId: string): Promise<void> {
  //   return this.userService.logout(userId)
  // }

  // @isPublic()
  // @UseGuards(RtGuard)
  // @Post('refresh')
  // refreshTokens(@CurrentUserId() userId: string, @CurrentUser('rt') refreshToken: string): Promise<Tokens> {
  //   return this.userService.refreshTokens(userId, refreshToken)
  // }  

  // @CacheKey('user')
  // @CacheTTL(10)
  // @Get('user')
  // findCurrentUser(@CurrentUserId() userId: string) {
  //   return this.userService.findCurrentUser(userId);
  // }

  // // @Get(':id')
  // // findOne(@Param('id') id: string) {
  // //   return this.userService.findOne(id);
  // // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<User> {
  //   return this.userService.remove(id);
  // }
}
