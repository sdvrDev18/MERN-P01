import mongoose from "mongoose";

const postSchema = {
  name: String,
  age: Number,
  address: String
};

const postMessage = mongoose.model("postMessage", postSchema);

export default postMessage;
