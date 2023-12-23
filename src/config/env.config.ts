import { z } from "zod";
import dotenv from "dotenv";

const appConfig = z.object({
  PORT: z
    .string()
    .default("8000")
    .transform((val) => +val)
    .pipe(z.number()),
});

const dbConfig = z.object({
  MONGO_URI: z.string(),
});

const jwtConfig = z.object({
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().min(1),
});

export const envSchema = z.object({
  ...appConfig.shape,
  ...dbConfig.shape,
  ...jwtConfig.shape,
});

dotenv.config();

export const env = envSchema.parse(process.env);
