import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

import httpStatus from "http-status";

export const catchAsync = (fn: RequestHandler) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      

      const err = error as Error & {
        statusCode?: number;
      };

      const statusCode =
        err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;

      res.status(statusCode).json({
        success: false,
        message: err.message,
        errors: err.message,
      });
    }
  };
};

export default catchAsync;