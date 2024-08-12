import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput, CreateUserNameInput } from './dto/create-user.input';
import { SessionGuard } from 'src/auth/session.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  @UseGuards(SessionGuard)
  createUser(
    @Args('createUserNameInput') createUserNameInput: CreateUserNameInput,
    @Context() context,
  ) {
    const req = context.req;
    const user: CreateUserInput = {
      ...createUserNameInput,
      uid: req.auth?.uid,
      email: req.auth?.email,
      picture: req.auth?.email,
    };
    return this.usersService.create(user);
  }

  @Mutation(() => User)
  @UseGuards(SessionGuard)
  upsertUser(
    @Args('createUserNameInput') createUserNameInput: CreateUserNameInput,
    @Context() context,
  ) {
    const req = context.req;
    const [firstName, lastName] = req.auth.name.split(' ');
    const user: CreateUserInput = {
      firstName,
      lastName,
      uid: req.auth?.uid,
      email: req.auth?.email,
      picture: req.auth?.email,
    };
    return this.usersService.upsertUser(user);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('uid') uid: string) {
    return this.usersService.findOne(uid);
  }
}
