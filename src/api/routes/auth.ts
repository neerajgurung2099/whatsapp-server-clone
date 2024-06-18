import { Router } from "express";
import { Joi, celebrate } from "celebrate";
import { Request, Response, NextFunction } from "express";
import { Logger } from "winston";
import Container from "typedi";
import AuthService from "@/services/auth";
import { IUserInputDTO } from "@/interfaces/IUser";
const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signup",
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug("Calling sign-up endpoint with body: %o", req.body);
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignUp(
          req.body as IUserInputDTO
        );
        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error("error: %o", e);
        return next(e);
      }
    }
  );

  route.post(
    "/signin",
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get("logger");
      logger.debug(`Calling sign-in endpoint with body: %o`, req.body);

      try {
        const { email, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignIn(
          email,
          password
        );
        return res.status(200).json({ user, token });
      } catch (e) {}
    }
  );
};
