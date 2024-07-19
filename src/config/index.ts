import dotenv from "dotenv";
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// const envFound = dotenv.config();
// if (envFound.error) {
//   throw new Error("Could'nt find .env file");
// }
export default {
  port: parseInt(process.env.PORT, 10),

  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
  api: {
    prefix: "/api",
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,
  databaseUrl: process.env.MONGODB_URI,
};
