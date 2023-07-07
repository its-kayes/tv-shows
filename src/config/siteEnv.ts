import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';

type SiteEnvTypes = {
  PORT: number;
  MONGO_URI: string;
  JWT_SECRET: Secret;
  JWT_EXPIRES_IN: string;
  FRONTEND_BASE_URL: string;
  NODE_ENV: string;
  HASH_SALT: number;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;
};

dotenv.config();

const {
  PORT,
  MONGO_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  FRONTEND_BASE_URL,
  NODE_ENV,
  HASH_SALT,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN
} = process.env as unknown as SiteEnvTypes;
export {
  FRONTEND_BASE_URL,
  HASH_SALT,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  MONGO_URI,
  NODE_ENV,
  PORT,
};
