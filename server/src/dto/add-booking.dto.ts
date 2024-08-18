import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddBookingDto {
  @Field()
  uid?: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  shopId: string;
}
