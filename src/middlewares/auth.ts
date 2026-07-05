import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import config from "../config/config.js";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
        errors: "Token is missing",
      });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret
    );

    req.user = decoded as Request["user"];

    next();

  } catch {

    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
      errors: "Invalid or expired token",
    });

  }
};