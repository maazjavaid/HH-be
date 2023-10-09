import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { compare, hash } from "bcryptjs";
import { User, UserModel } from "../../models/User";
import { LoginResponse } from "./loginResponseType";
import { sign } from "jsonwebtoken";
@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await UserModel.find({});
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ): Promise<LoginResponse> {
    try {
      const user: User | null = await UserModel.findOne({ email });
      if (!user) throw new Error("User not found");
      if (!(await compare(password, user.password))) throw new Error("Incorrect password");

      return {
        accessToken: sign({ userId: user._id }, "randomString", { expiresIn: "15m" }),
      };
    } catch (error) {
      return {
        accessToken: null,
      };
    }
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("userName", () => String) userName: string,
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ) {
    try {
      await UserModel.create({
        userName,
        email,
        password: hash(password, 12),
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
