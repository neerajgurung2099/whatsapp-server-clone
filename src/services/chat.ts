import { IChat } from "@/interfaces";
import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export class ChatService {
  constructor(
    @Inject("logger") private logger: Logger,
    @Inject("chatModel") private chatModel: Models.ChatModel
  ) {}

  public async CreateChat(participants: string[]): Promise<string> {
    try {
      const chatRecord = await this.chatModel.create({
        participants: participants,
      });
      if (!chatRecord) {
        throw new Error("Chat cannot be created");
      }
      const chat = chatRecord.toObject();
      return chat._id;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetChatList(userId: string): Promise<IChat[]> {
    try {
      const chatList = await this.chatModel.find({ participants: userId });
      return chatList;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
