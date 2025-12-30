import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export const JWT_SECRET = process.env.JWT_SECRET;

export const PORT = Number(process.env.PORT || 3001);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

console.log("[HTTP] Loaded env, PORT =", PORT);