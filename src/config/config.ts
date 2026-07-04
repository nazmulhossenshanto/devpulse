import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.join(process.cwd(), ".env") })
export default {
    port: process.env.PORT || 5000,
    connectionString : process.env.DATABASE_URL as string,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET as string,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET as string,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
    jwt_refresh_expires_in: process.env.jWT_REFRESH_EXPIRES_IN as string,
    jwt_salt_round: Number(process.env.JWT_SALT_ROUNDS)
}