import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { CartService } from '../cart/cart.service';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types/tokens.type';
import { ForbiddenException } from '@nestjs/common/exceptions';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cartService: CartService
  ) { }



  async signUp(createUserDto: Prisma.UserCreateInput): Promise<Tokens> {
    let hashedPassword = await this.hashData(createUserDto.password)
    const user = await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword
      }, include: {
        cart: {
          where: {
            userId: createUserDto.id
          }
        }
      }
    })
    await this.cartService.create(user.id)
    const tokens = await this.createTokens(user.id, user.email)
    await this.updateRt(user.id, tokens.refresh_token)
    return tokens
  }

  async signIn(createUserDto: Prisma.UserCreateInput): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })
    if(!user) {
      throw new ForbiddenException('User not found')
    }
    const comparePassword = await bcrypt.compare(createUserDto.password, user.password)
    if(!comparePassword) {
      throw new ForbiddenException('Invalid password or email!')
    }
    const tokens = await this.createTokens(user.id, user.email)
    await this.updateRt(user.id, tokens.refresh_token)
    return tokens
  }

  async updateRt(userId: string, refreshToken: string) {
    const hashedToken = await this.hashData(refreshToken)
    await this.prisma.user.update({
      where: {
        id: userId
      }, data: {
        harshedRt: hashedToken
      }
    })
  }

  async logout(userId: string) {
    // get user by userId where hashedRt is not null, and set it to null
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        harshedRt: {
          not: null
        }
      },data: {
        harshedRt: null
      }
    })
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!user || !user.harshedRt) {
      throw new ForbiddenException('Access denied!')
    }
    
    const refreshMatch = await bcrypt.compare(refreshToken, user.harshedRt)
    if(!refreshMatch) {
      throw new ForbiddenException('Access denied!')
    }

    const tokens = await this.createTokens(user.id, user.email)
    await this.updateRt(user.id, tokens.refresh_token)
    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 12)
  }

  async createTokens(userId: string, email: string): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        sub: userId,
        email
      }, {
        expiresIn: 60 * 20,
        secret: process.env.AT_SECRET
      }),
      this.jwtService.signAsync({
        sub: userId,
        email
      }, {
        expiresIn: '14d',
        secret: process.env.RT_SECRET
      })
    ])
    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        cart: true
      }
    })
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id }, include: {
        cart: {
          where: {
            userId: id
          }, include: {
            products: true
          }
        }
      }
    })
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
