import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  uid: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  shopName: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  picture: string;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  type: string;

  @Field({ nullable: true })
  complete: boolean;
}
