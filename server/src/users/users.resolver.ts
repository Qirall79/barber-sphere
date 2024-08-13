import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { CreateUserInput, CreateUserNameInput } from '../dto/create-user.input';
import { Booking } from 'src/entities/booking.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Service } from 'src/entities/service.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => User)
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
  upsertUser(@Context() context) {
    const req = context.req;
    const [firstName, lastName] = req.auth.name.split(' ');
    const user: CreateUserInput = {
      firstName,
      lastName,
      uid: req.auth?.uid,
      email: req.auth?.email,
      picture: req.auth?.picture,
    };
    return this.usersService.upsertUser(user);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(@Args('uid') uid: string) {
    return this.usersService.findOne(uid);
  }

  @ResolveField(() => [Booking])
  async books(@Parent() user: User) {
    return await this.prisma.booking.findMany({
      where: {
        userId: user.uid,
      },
    });
  }

  @ResolveField(() => [Booking])
  async bookings(@Parent() user: User) {
    return await this.prisma.booking.findMany({
      where: {
        shopId: user.uid,
      },
    });
  }

  @ResolveField(() => [Service])
  async services(@Parent() user: User) {
    return await this.prisma.service.findMany({
      where: {
        shopId: user.uid,
      },
    });
  }
}
