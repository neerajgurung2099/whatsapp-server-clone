import express from "express";
import cors from "cors";
import config from "@/config";
import routes from "@/api";
export default ({ app }: { app: express.Application }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });

  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, routes());

  //catch 404
  app.use((req, res, next) => {
    const err = new Error("Not found");
    err["status"] = 404;
    next(err);
  });

  //error handlers
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
