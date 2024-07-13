import { Router } from "express";
import { isAuth } from "../middlewares/isAuth";
import { attachCurrentUser } from "../middlewares/attachCurrentUser";
import { Request, Response } from "express";
import { IUser } from "@/interfaces/IUser";
import { Logger } from "winston";
import Container from "typedi";

type CustomRequest = Request & {
  currentUser: IUser;
};
const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  route.get(
    "/me",
    isAuth,
    attachCurrentUser,
    (req: CustomRequest, res: Response) => {
      return res
        .json({
          user: req.currentUser,
        })
        .status(200);
    }
  );
};
