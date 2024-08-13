import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserInput): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return newUser;
  }

  async upsertUser(user: CreateUserInput): Promise<User> {
    const newUser = await this.prisma.user.upsert({
      where: {
        uid: user.uid,
      },
      create: user,
      update: user,
    });
    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(uid: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        uid,
      },
    });
    return user;
  }
}
