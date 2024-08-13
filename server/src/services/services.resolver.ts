import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Service } from 'src/entities/service.entity';
import { User } from 'src/entities/user.entity';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField(() => User)
  async shop(@Parent() service: Service) {
    return await this.prisma.user.findFirst({
      where: {
        uid: service.shopId,
      },
    });
  }
}
