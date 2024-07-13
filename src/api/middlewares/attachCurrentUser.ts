import { IUser } from "@/interfaces/IUser";
import mongoose from "mongoose";
import Container from "typedi";
import { Logger } from "winston";

export const attachCurrentUser = async (req, res, next) => {
  const logger: Logger = Container.get("logger");
  try {
    const userModel = Container.get("userModel") as mongoose.Model<
      IUser & mongoose.Document
    >;
    const userRecord = await userModel.findById(req.auth._id);
    if (!userRecord) {
      return res.sendStatus(401);
    }
    const currentUser = userRecord.toObject();
    Reflect.deleteProperty(currentUser, "password");
    Reflect.deleteProperty(currentUser, "salt");
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    logger.error(`Error attaching user to req %o`, e);
    return next(e);
  }
};
