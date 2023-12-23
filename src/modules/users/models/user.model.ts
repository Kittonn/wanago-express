import { Schema, model, Document, InferSchemaType } from "mongoose";

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

export type User = Document & InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
