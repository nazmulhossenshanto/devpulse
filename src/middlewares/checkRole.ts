 import type {
  NextFunction,
  Request,
  Response,
} from "express";
import httpStatus from "http-status";

export const checkRole =
  (...roles: ("contributor" | "maintainer")[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    if (!req.user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
        errors: "User not found",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Forbidden",
        errors: "You are not authorized",
      });
    }

    next();
  };