import { IMessage } from "@/interfaces/IMessage";
import mongoose from "mongoose";

const Message = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    content: String,
  },
  { timestamps: true }
);
export default mongoose.model<IMessage & mongoose.Document>("Message", Message);
