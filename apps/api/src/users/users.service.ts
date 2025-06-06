import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({ data: { ...createUserDto } });
  }
  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`${id}의 유저는 존재하지 않습니다.`);
    }
    return user;
  }
  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`${email}의 유저는 존재하지 않습니다.`);
    }
    return user;
  }
  async findUserByPhone(phone: string) {
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new NotFoundException(`${phone}의 유저는 존재하지 않습니다.`);
    }
    return user;
  }

  async findAllUser() {
    return await this.prisma.user.findMany();
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const beforeUpdateData = await this.prisma.user
      .findUnique({
        where: {
          id: id,
        },
      })
      .catch((error) => console.log(error));
    if (!beforeUpdateData) {
      throw new NotFoundException(`${id} 사용자는 존재하지 않습니다`);
    }
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: { ...dto },
    });
  }

  async removeUser(id: string) {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
