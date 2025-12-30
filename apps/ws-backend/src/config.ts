import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const redisURL = process.env.REDIS_URL;

export const TOPIC = process.env.REDIS_TOPIC || "chat_messages";

export const PORT = Number(process.env.PORT || 8080);

if (!redisURL) {
  throw new Error("REDIS_URL is missing");
}

console.log("[WS] ENV loaded", { PORT, redisURL });