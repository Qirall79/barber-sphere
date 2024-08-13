import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String)
  uid: string;

  @Field(() => String)
  shopName: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  picture: string;
}
