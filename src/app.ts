import express from "express";
import actuator from "express-actuator";
import {
  RedisClientOptions,
  RedisFunctions,
  RedisModules,
  RedisScripts,
  createClient,
} from "redis";
import winston from "winston";
import apiRouter from "./api";
import { errorLogger, requestLogger } from "./middleware";
import { mkdirSync } from "fs";

// Prepare data directory
const dataDirectory = process.env.DATA_PATH ?? "data";
mkdirSync(dataDirectory, { recursive: true });

// Init logger
const loggerInstance = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `${dataDirectory}/ryujinx-ldn-website.log`,
    }),
  ],
});

export const logger = loggerInstance.child({
  source: "Node",
});

const redisClientOptions: RedisClientOptions<
  RedisModules,
  RedisFunctions,
  RedisScripts
> = {
  // NOTE: Enable this if we ever start using cluster mode
  // readonly: true,
};

// Prefer unix socket over REDIS_URL
if (process.env.REDIS_SOCKET != null && process.env.REDIS_SOCKET.length > 0) {
  redisClientOptions.socket = {
    path: process.env.REDIS_SOCKET,
  };
} else {
  redisClientOptions.url = process.env.REDIS_URL;
}

// Init Redis client
export const redisClient = createClient(redisClientOptions);

redisClient.on("error", (err: Error) =>
  loggerInstance.error(err.message, {
    source: "Redis client",
    stacktrace: err.stack,
  })
);

// Init express server
export const app = express();
app.set("view engine", "ejs");

// This is set by NODE_ENV
if (app.get("env") === "production") {
  // Trust first proxy
  app.set("trust proxy", 1);
}

// Readiness/Liveness probes and other application info
app.use(actuator());

// Logger middleware
app.use(requestLogger);

// Set up routes
app.use(express.static("public"));
app.use("/api", apiRouter);

// Error-handling
app.use(errorLogger);
