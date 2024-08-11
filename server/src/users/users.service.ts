import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createUser(user: AuthDto): Promise<AuthDto> {
    const newUser = await this.prisma.user.create({
      data: user,
    });
    return newUser;
  }

  async upsertUser(user: AuthDto): Promise<AuthDto> {
    const newUser = await this.prisma.user.upsert({
      where: {
        uid: user.uid,
      },
      create: user,
      update: user,
    });
    return newUser;
  }

  async getUser(uid: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        uid,
      },
    });
    return user;
  }

  async clearUsers() {
    await this.prisma.user.deleteMany();
  }
}
