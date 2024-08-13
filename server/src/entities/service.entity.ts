import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Service {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  shopId: string;

  @Field(() => [String])
  pictures: string[];
}
