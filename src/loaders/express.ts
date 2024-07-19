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

  const allowedDomains = ["https://whatsapp.neerajgurung.com.np"];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedDomains.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions));
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
