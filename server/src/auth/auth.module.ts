import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from './firebase.service';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthService, FirebaseService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
