import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { BadRequestException, UnauthorizedException} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { Req } from '@nestjs/common/decorators';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  @Post('register')
  async signUp(@Body() createUserDto: Prisma.UserCreateInput) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, 15)
      const user = await this.userService.signUp({
        email: createUserDto.email,
        password: hash,
        Cart: createUserDto.Cart
      });
      let { password, ...response } = user
      return response

    } catch (error) {
      throw new BadRequestException('Email already exists!')
    }

  }

  @Post('login')
  async singIn(@Body() createUserDto: Prisma.UserCreateInput, @Res({ passthrough: true }) response: Response) {
    const user = await this.userService.findOneByEmail(createUserDto.email)
    if (!user) {
      throw new BadRequestException('User not found!')
    }

    if (!await bcrypt.compare(createUserDto.password, user.password)) {
      throw new BadRequestException('Invalid email or password!')
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id
    })

    response.cookie('jwt', jwt, { httpOnly: true })
    return {
      response: 'Logged In'
    }
  }

  @Get('user')
  async user(
    @Req() request: Request
  ) {
    try {
      const cookie = request.cookies['jwt']

      const responseData = await this.jwtService.verifyAsync(cookie)

      if (!responseData) {
        throw new UnauthorizedException()
      }

      const user = await this.userService.findOne(responseData['id'])

      const { password, ...data } = user

      return data
      
    } catch (error) {
      throw new UnauthorizedException()
    }

  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt')
    return {
      response: 'Logged Out'
    }
  }

  @Get('users')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
