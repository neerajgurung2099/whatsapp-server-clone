import depedencyInjector from "./depedencyInjector";
import express from "./express";
import Logger from "./logger";
import user from "@/models/user";
import mongoose from "./mongoose";
export default async ({ expressApp }) => {
  await mongoose();
  Logger.info("MongoDb loaded and connected");
  const userModel = {
    name: "userModel",
    model: user,
  };
  await depedencyInjector({
    models: [userModel],
  });
  await express({ app: expressApp });
  Logger.info("Express loaded");
};
