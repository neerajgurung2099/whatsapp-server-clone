import { IUser, IUserInputDTO } from "@/interfaces/IUser";
import { Inject, Service } from "typedi";
import argon2 from "argon2";

import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import config from "@/config";
import { Logger } from "winston";

@Service()
export default class AuthService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("userModel") private userModel: Models.UserModel
  ) {}
  public async SignUp(
    userInputDTO: IUserInputDTO
  ): Promise<{ user: IUser; token: string }> {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      const userRecord = await this.userModel.create({
        ...userInputDTO,
        salt: salt.toString("hex"),
        password: hashedPassword,
      });
      const token = this.generateToken(userRecord);
      if (!userRecord) {
        throw new Error("User cannot be created");
      }
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign(
      {
        _id: user.id,
        name: user.name,
        exp: exp.getTime() / 100,
      },
      config.jwtSecret
    );
  }
}
