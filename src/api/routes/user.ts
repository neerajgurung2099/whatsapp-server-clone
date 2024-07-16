import { IUser } from "@/interfaces/IUser";
import { Request, Response, Router } from "express";
import { attachCurrentUser } from "../middlewares/attachCurrentUser";
import { isAuth } from "../middlewares/isAuth";

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
