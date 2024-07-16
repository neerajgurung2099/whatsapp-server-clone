import { IChat } from "@/interfaces/IChat";
import mongoose from "mongoose";

const Chat = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IChat & mongoose.Document>("Chat", Chat);
