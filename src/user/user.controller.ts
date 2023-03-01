import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, CacheKey, CacheTTL } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { Tokens } from './types/tokens.type';
import { RtGuard } from './decorators/guards/rt.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserId } from './decorators/current-user-id.decorator';
import { isPublic } from './decorators/is-public-route.decorator';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private cartService: CartService
  ) { }

  @isPublic()
  @Post('register')
  async signUp(@Body() createUserDto: Prisma.UserCreateInput): Promise<Tokens> {
    return this.userService.signUp(createUserDto)
  }

  @isPublic()
  @Post('login')
  async singIn(@Body() createUserDto: Prisma.UserCreateInput): Promise<Tokens> {
    return this.userService.signIn(createUserDto)
  }

  @isPublic()
  @Post('logout')
  logout(@CurrentUserId() userId: string) {
    return this.userService.logout(userId)
  }

  @isPublic()
  @UseGuards(RtGuard)
  @Post('refresh')
  refreshTokens(@CurrentUserId() userId: string, @CurrentUser('rt') refreshToken: string) {
    return this.userService.refreshTokens(userId, refreshToken)
  }  

  @CacheKey('user')
  @CacheTTL(10)
  @Get('user')
  findCurrentUser(@CurrentUserId() userId: string) {
    return this.userService.findCurrentUser(userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
