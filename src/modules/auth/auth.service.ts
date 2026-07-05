import config from "../../config/config.js";
import { pool } from "../../db/index.js";
import type { ILoginUser, IRegisterUser } from "./auth.types.js";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload} from "jsonwebtoken"

const registerUserIntoDB = async (payLoad: IRegisterUser) => {
  const { name, email, password, role } = payLoad;
  const hashedPassword = await bcrypt.hash(password, config.salt_round);
  const isUserExists = await pool.query(
    `
SELECT id
FROM users
WHERE email=$1
`,
    [email],
  );
  if (isUserExists.rows.length > 0) {
    throw new Error("Email already exists");
};
if (
role !== "contributor" &&
role !== "maintainer"
){
throw new Error("Invalid role");
};
  const result = await pool.query(
    `
        INSERT INTO users (name, email, password, role) 
        VALUES($1,$2,$3,$4) RETURNING id, name, email, role, created_at, updated_at`,
    [name, email, hashedPassword, role],
  );
  return result.rows[0];
};

const loginUserIntoDB = async(payLoad:ILoginUser )=>{
const {email, password} = payLoad;
const result = await pool.query(`
  SELECT * FROM users WHERE email=$1
  `, [email]);

  if(result.rows.length === 0){
    throw new Error("Invalid email and password");
  };
  const user = result.rows[0];
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if(!isPasswordMatched){
    throw new Error("Invalid email or password")
  };
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role
  };

  const token = jwt.sign(jwtPayload, config.jwt_access_secret, {expiresIn: config.jwt_access_expires_in});

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
  loginUserIntoDB
};
