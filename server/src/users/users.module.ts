import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseService } from 'src/auth/firebase.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, FirebaseService],
})
export class UsersModule {}
