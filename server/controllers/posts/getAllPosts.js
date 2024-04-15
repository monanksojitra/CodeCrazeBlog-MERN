import { Post } from "../../models/Post.js";

const getAllPosts = async (req, res) => {
  try {
    const data = await Post.find({});
    if (!data) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post fetched", data });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default getAllPosts;
