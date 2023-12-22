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

export const envSchema = z.object({
  ...appConfig.shape,
  ...dbConfig.shape,
});

dotenv.config();

export const env = envSchema.parse(process.env);
