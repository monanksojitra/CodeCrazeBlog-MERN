import { BlogPost } from "../../models/bloger.js";

const getPostByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await BlogPost.find({ author: userId });
    if (!data) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({
      message: "Post fetched",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default getPostByUserId;
