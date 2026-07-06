import config from "../../config/config.js";
import { pool } from "../../db/index.js";
import type { ILoginUser, IRegisterUser } from "./auth.types.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";

const registerUserIntoDB = async (payLoad: IRegisterUser) => {
  const { name, email, password, role } = payLoad;

  if (!name.trim()) {
    const error = new Error("Name is required") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.BAD_REQUEST;

    throw error;
  }

  if (!email.trim()) {
    const error = new Error("Email is required") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.BAD_REQUEST;

    throw error;
  }

  if (!password.trim()) {
    const error = new Error("Password is required") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.BAD_REQUEST;

    throw error;
  }

  if (role !== "contributor" && role !== "maintainer") {
    const error = new Error("Invalid role") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.BAD_REQUEST;

    throw error;
  }

  const isUserExists = await pool.query(
    `
    SELECT id
    FROM users
    WHERE email = $1
    `,
    [email.trim()],
  );

  if (isUserExists.rows.length > 0) {
    const error = new Error("Email already exists") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.CONFLICT;

    throw error;
  }

  const hashedPassword = await bcrypt.hash(
    password.trim(),
    config.salt_round,
  );

  const result = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      password,
      role
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4
    )
    RETURNING
      id,
      name,
      email,
      role,
      created_at,
      updated_at
    `,
    [
      name.trim(),
      email.trim(),
      hashedPassword,
      role,
    ],
  );

  return result.rows[0];
};

const loginUserIntoDB = async (payLoad: ILoginUser) => {
  const { email, password } = payLoad;

  if (!email.trim()) {
    const error = new Error("Email is required") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.BAD_REQUEST;

    throw error;
  }

  if (!password.trim()) {
    const error = new Error("Password is required") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.BAD_REQUEST;

    throw error;
  }

  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      password,
      role,
      created_at,
      updated_at
    FROM users
    WHERE email = $1
    `,
    [email.trim()],
  );

  if (result.rows.length === 0) {
    const error = new Error("Invalid email or password") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.UNAUTHORIZED;

    throw error;
  }

  const user = result.rows[0];

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password,
  );

  if (!isPasswordMatched) {
    const error = new Error("Invalid email or password") as Error & {
      statusCode?: number;
    };

    error.statusCode = httpStatus.UNAUTHORIZED;

    throw error;
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      updated_at: user.updated_at,
    },
  };
};

export const authService = {
  registerUserIntoDB,
  loginUserIntoDB,
};