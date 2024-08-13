import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BookingsService } from './bookings.service';
import { Booking } from 'src/entities/booking.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/entities/user.entity';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => Booking)
  async getBooking() {}

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
