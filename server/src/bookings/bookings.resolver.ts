import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from 'src/entities/booking.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/entities/user.entity';
import { AddBookingDto } from 'src/dto/add-booking.dto';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Booking)
  async getBooking(@Args('id') id: number) {
    return await this.bookingsService.getBooking(id);
  }

  @Query(() => [Booking])
  async getUserBookings(@Args('uid') uid: string) {
    return await this.bookingsService.getUserBookings(uid);
  }

  @Query(() => [Booking])
  async getShopBookings(@Args('uid') uid: string) {
    return await this.bookingsService.getShopBookings(uid);
  }

  @Mutation(() => Booking)
  async createBooking(
    @Args('booking') booking: AddBookingDto,
    @Context() context,
  ): Promise<Booking> {
    const req = context.req;
    booking.uid = req.auth.uid;
    return await this.bookingsService.addBooking(booking);
  }

  @Mutation(() => String, { nullable: true })
  async deleteBooking(@Args('id') id: number) {
    return await this.bookingsService.deleteBooking(id);
  }
  
  @ResolveField(() => User)
  async user(@Parent() booking: Booking) {
    return await this.prisma.user.findFirst({
      where: {
        uid: booking.userId,
      },
    });
  }

  @ResolveField(() => User)
  async shop(@Parent() booking: Booking) {
    return await this.prisma.user.findFirst({
      where: {
        uid: booking.shopId,
      },
    });
  }
}
