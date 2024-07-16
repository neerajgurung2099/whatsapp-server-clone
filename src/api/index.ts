import { Router } from "express";
import auth from "./routes/auth";
import user from "./routes/user";
import chat from "./routes/chat";
export default () => {
  const app = Router();
  auth(app);
  user(app);
  chat(app);
  return app;
};
