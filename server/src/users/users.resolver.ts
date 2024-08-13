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
import {
  CreateUserInput,
  CreateUserNameInput,
  UpsertUserInput,
} from '../dto/create-user.input';
import { Booking } from 'src/entities/booking.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { Service } from 'src/entities/service.entity';
import { UpdateUserInput } from 'src/dto/update-user.input';

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
  async upsertUser(
    @Args('upsertUserInput') upsertUserInput: UpsertUserInput,
    @Context() context,
  ) {
    const req = context.req;
    const [firstName, lastName] = req.auth.name.split(' ');
    const user: CreateUserInput = {
      firstName,
      lastName,
      uid: req.auth?.uid,
      email: req.auth?.email,
      picture: req.auth?.picture,
      type: upsertUserInput.type,
    };
    return await this.usersService.upsertUser(user);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context,
  ) {
    const req = context.req;
    const { picture, location, shopName } = updateUserInput;
    return await this.prisma.user.update({
      where: {
        uid: req.auth?.uid,
      },
      data: {
        picture,
        location,
        shopName,
        complete: true,
      },
    });
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
