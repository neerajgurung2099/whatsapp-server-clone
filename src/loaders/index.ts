import depedencyInjector from "./depedencyInjector";
import express from "./express";
import Logger from "./logger";
import user from "@/models/user";
import mongoose from "./mongoose";
import chat from "@/models/chat";
export default async ({ expressApp }) => {
  await mongoose();
  Logger.info("MongoDb loaded and connected");
  const userModel = {
    name: "userModel",
    model: user,
  };
  const chatModel = {
    name: "chatModel",
    model: chat,
  };
  await depedencyInjector({
    models: [userModel, chatModel],
  });
  await express({ app: expressApp });
  Logger.info("Express loaded");
};
