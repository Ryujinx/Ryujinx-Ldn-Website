import { Request, Response, NextFunction } from "express";
import { logger } from "./app";
import { loggerDefaultMetadata } from "./utils";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    logger.debug("Incoming request.", loggerDefaultMetadata(req));
    next();
}

export function errorLogger(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logger.error(err.message, {
        error: err,
        ...loggerDefaultMetadata(req),
    });
    next(err);
}
