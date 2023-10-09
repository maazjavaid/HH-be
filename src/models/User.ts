import { prop, getModelForClass } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  public _id!: string;

  @prop({ required: true })
  @Field()
  public userName!: string;

  @Field()
  @prop({ required: true })
  public email!: string;

  @Field()
  @prop({ required: true })
  public password!: string;
}

export const UserModel = getModelForClass(User);
