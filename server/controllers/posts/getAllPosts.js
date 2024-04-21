import { Post } from "../../models/Post.js";

const getAllPosts = async (req, res, next) => {
  try {
    const data = await Post.find({});
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }
    return res
      .status(200)
      .json({ message: "Posts fetched successfully", posts: data });
  } catch (err) {
    // Pass the error to the next middleware for handling
    next(err);
  }
};

export default getAllPosts;
