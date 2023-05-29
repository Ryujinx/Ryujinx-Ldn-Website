import { Request } from "express";

export function loggerDefaultMetadata(request: Request): object {
  return {
    userAgent: request.header("User-Agent"),
    url: request.url,
    ip: request.ip,
  };
}
