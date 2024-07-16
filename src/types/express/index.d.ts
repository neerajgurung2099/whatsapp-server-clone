import "reflex";
import { IUser, IChat } from "@/interfaces";
import { Document, Model } from "mongoose";

declare global {
  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type ChatModel = Model<IChat & Document>;
  }
}
