import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ){}

  signUp(createUserDto: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: createUserDto
    })
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        Cart: true
      }
    })
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({where: {id}, include: {
      Cart: true
    }})
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({where: {email}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
