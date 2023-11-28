import PostMessage from "../models/postMessage.js";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://Sachdev:Thegodfather%400@cluster0.p38azic.mongodb.net/";
const client = new MongoClient(uri);

export const mongoQuerry = async (req, res) => {
  try {
    // Get the database and collection on which to run the operation
    const database = client.db("MERN101");
    const users = database.collection("User");

    const query = { isActive: true };

    const user = await users.find(query);

    for await (const doc of user) {
      console.dir(doc);
    }
  } finally {
    await client.close();
  }
};

export const getPosts = () => {
  mongoQuerry().catch(console.dir);
};

// export const getPosts = async (req, res) => {
//   try {
//     const postMessage = await PostMessage.find();

//     res.status(200);
//     res.json(postMessage);
//   } catch (error) {
//     res.status(404);
//     res.json({ message: error.message });
//   }
// };

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(200).json(newPost);
    console.log("ADDED", res);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
