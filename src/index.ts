import { env } from "process";
import { app, logger } from "./app";
import http from "http";

const server = http.createServer(app);
server.listen(parseInt(env.PORT || "3000"), env.HOST || "127.0.0.1");

server.on("error", (error: Error) => {
  logger.error("An error occurred.", error);
});

server.on("listening", () => {
  logger.info("Startup done!", server.address());
});
