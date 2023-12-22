import mongoose from "mongoose";
import { env } from "../config/env.config";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);

    console.log(`🌈 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`🔥 Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
