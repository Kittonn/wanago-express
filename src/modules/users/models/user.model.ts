import { Schema, model, Document, InferSchemaType } from "mongoose";

const addressSchema = new Schema({
  street: String,
  city: String,
  country: String,
  zip: String,
});

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  address: addressSchema,
});

export type User = Document & InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
