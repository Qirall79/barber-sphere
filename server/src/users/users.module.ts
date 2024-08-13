import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { FirebaseService } from 'src/auth/firebase.service';

@Module({
  providers: [UsersResolver, UsersService, FirebaseService],
})
export class UsersModule {}
