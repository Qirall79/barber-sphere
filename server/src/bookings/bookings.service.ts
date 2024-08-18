import { Injectable } from '@nestjs/common';
import { AddBookingDto } from 'src/dto/add-booking.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async addBooking(booking: AddBookingDto) {
    return await this.prisma.booking.create({
      data: {
        userId: booking.uid,
        shopId: booking.shopId,
        startTime: booking.startTime,
        endTime: booking.endTime,
      },
    });
  }

  async getBooking(id: number) {
    await this.prisma.booking.findFirst({
      where: {
        id,
      },
    });
  }

  async getUserBookings(uid: string) {
    await this.prisma.booking.findMany({
      where: {
        userId: uid,
      },
    });
  }

  async getShopBookings(uid: string) {
    await this.prisma.booking.findMany({
      where: {
        shopId: uid,
      },
    });
  }

  async deleteBooking(id: number) {
    await this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}
