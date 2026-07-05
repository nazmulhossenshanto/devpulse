import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env") })
export default {
    port: process.env.PORT || 5000,
    connectionString : process.env.DATABASE_URL!,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET! ,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET!,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN! as SignOptions["expiresIn"],
    jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN! as SignOptions["expiresIn"],
    salt_round: Number(process.env.SALT_ROUNDS)
}