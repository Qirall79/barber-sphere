import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  uid: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  picture: string;
}

@InputType()
export class CreateUserNameInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
