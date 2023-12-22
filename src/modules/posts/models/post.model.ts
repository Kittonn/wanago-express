import { Schema, model, Document, InferSchemaType } from "mongoose";

const postSchema = new Schema({
  author: String,
  content: String,
  title: String,
});

export type Post = Document & InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema); 
