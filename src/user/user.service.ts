import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { CartService } from '../cart/cart.service';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { Tokens } from './types/tokens.type';
import { ForbiddenException } from '@nestjs/common/exceptions';
import exclude from '../utils/excludeField';
import hashData from '../utils/hashData';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cartService: CartService
  ) { }



  async signUp(createUserDto: Prisma.UserCreateInput): Promise<Tokens> {
    // Hash user password
    let hashedPassword = await hashData(createUserDto.password, 12)
    // Create user
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
    // Generate cart for new user
    await this.cartService.create(user.id)
    // Assign id and email into token
    const tokens = await this.createTokens(user.id, user.email)
    // Update refresh token
    await this.updateRt(user.id, tokens.refresh_token)
    return tokens
  }

  async signIn(createUserDto: Prisma.UserCreateInput): Promise<Tokens> {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email
      }
    })
    // Throw error if user not found
    if (!user) {
      throw new ForbiddenException('User not found')
    }
    // Compare provided password and password saved in db
    const comparePassword = await bcrypt.compare(createUserDto.password, user.password)
    // Throw error if password invalid
    if (!comparePassword) {
      throw new ForbiddenException('Invalid password or email!')
    }
    // Create and return tokens if user is valid
    const tokens = await this.createTokens(user.id, user.email)
    await this.updateRt(user.id, tokens.refresh_token)
    return tokens
  }

  async updateRt(userId: string, refreshToken: string) {
    // Update refresh token
    const hashedToken = await hashData(refreshToken, 12)
    await this.prisma.user.update({
      where: {
        id: userId
      }, data: {
        harshedRt: hashedToken
      }
    })
  }

  async logout(userId: string) {
    // Get user by userId where hashedRt is not null, and set it to null
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        harshedRt: {
          not: null
        }
      }, data: {
        harshedRt: null
      }
    })
  }

  async refreshTokens(userId: string, refreshToken: string) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    // Throw error if user not found or if user doesn't have a refresh token
    if (!user || !user.harshedRt) {
      throw new ForbiddenException('Access denied!')
    }
    // Compare refresh tokens
    const refreshMatch = await bcrypt.compare(refreshToken, user.harshedRt)
    // Throw error if tokens do not match
    if (!refreshMatch) {
      throw new ForbiddenException('Access denied!')
    }
    // Create and return tokens
    const tokens = await this.createTokens(user.id, user.email)
    await this.updateRt(user.id, tokens.refresh_token)
    return tokens;
  }

  async createTokens(userId: string, email: string): Promise<Tokens> {
    // Create tokens as promises
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

  // Find user
  async findCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }  , include: {
        cart: {
          where: {
            userId: userId
          }, include: {
            products: true
          }
        }
      }
    })
    return exclude(user, ['password'])
  }

  // findOne(id: string) {
  //   return this.prisma.user.findUnique({
  //     where: { id }, include: {
  //       cart: {
  //         where: {
  //           userId: id
  //         }, include: {
  //           products: true
  //         }
  //       }
  //     }
  //   })
  // }

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
