import { Schema, model, Document, InferSchemaType } from "mongoose";

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
  title: String,
});

export type Post = Document & InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema);
