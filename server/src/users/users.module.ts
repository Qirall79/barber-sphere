import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseService } from 'src/auth/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [UsersService, FirebaseService, PrismaService],
  controllers: [UsersController],
})
export class UsersModule {}
