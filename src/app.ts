import express from "express";
import actuator from "express-actuator";
import winston from "winston";
import { errorLogger, requestLogger } from "./middleware";

// Init logger
const loggerInstance = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `data/ryujinx-ldn-website.log`,
    }),
  ],
});

export const logger = loggerInstance.child({
  source: "Node",
});

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

// Error-handling
app.use(errorLogger);
