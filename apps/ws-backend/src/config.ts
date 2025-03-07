// apps/http-backend/config.ts
import dotenv from "dotenv";
import path from "path";

// Load environment variables at the very start
dotenv.config({ path: path.resolve("../../.env") });

export const JWT_SECRET = process.env.JWT_SECRET ;

export const redisURL = process.env.REDIS_URL ;


export const TOPIC = "chat_messages";
