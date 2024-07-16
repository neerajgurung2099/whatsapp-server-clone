import { IUser } from "@/interfaces";
import { ChatService } from "@/services/chat";
import { celebrate, Joi } from "celebrate";
import { NextFunction, Request, Response, Router } from "express";
import Container from "typedi";
import { Logger } from "winston";
import { attachCurrentUser } from "../middlewares/attachCurrentUser";
import { isAuth } from "../middlewares/isAuth";

type CustomRequest = Request & {
  currentUser: IUser;
};
const route = Router();
export default (app: Router) => {
  app.use("/chat", route);

  route.get(
    "/",
    isAuth,
    attachCurrentUser,
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");

      try {
        const chatServiceInstance = Container.get(ChatService);
        const chatList = await chatServiceInstance.GetChatList(
          req.currentUser._id
        );
        res
          .json({
            chatList: chatList,
          })
          .status(200);
      } catch (e) {
        logger.error(e);
        next(e);
      }
    }
  );
  route.post(
    "/",
    isAuth,
    attachCurrentUser,
    celebrate({
      body: Joi.object({
        participants: Joi.array().items(Joi.string()).required(),
      }),
    }),
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling up create chat endpoint with body %o", req.body);
      try {
        const participants = req.body.participants;
        const currentUserId = req.currentUser._id;
        const chatServiceInstance = Container.get(ChatService);
        const chatId = await chatServiceInstance.CreateChat([
          currentUserId,
          participants,
        ]);
        res
          .json({
            chatId: chatId,
          })
          .status(201);
      } catch (e) {
        logger.error(e);
        next(e);
      }
    }
  );
};
