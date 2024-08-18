import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  shopId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Date)
  startTime: Date;

  @Field(() => Date)
  endTime: Date;
}
