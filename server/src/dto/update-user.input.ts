import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  shopName: string;

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => String, { nullable: true })
  picture: string;
}
