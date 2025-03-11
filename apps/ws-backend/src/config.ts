
import dotenv from "dotenv";
import path from "path";


dotenv.config({ path: path.resolve("../../.env") });

export const JWT_SECRET = process.env.JWT_SECRET ;

export const redisURL = process.env.REDIS_URL ;


export const TOPIC = process.env.REDIS_TOPIC ||  "chat_messages";
export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;