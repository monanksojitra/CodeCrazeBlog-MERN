import { BlogPost } from "../../models/bloger.js";
import User from "../../models/User.js"; // Assuming User model is in the same directory

const getPostByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = await BlogPost.find({ author: userId }).populate(
      "author",
      "name"
    );
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Posts not found for this user" });
    }

    // Include the author's username in the response
    const postsWithAuthorName = data.map((post) => ({
      ...post.toObject(),
      author: {
        ...post.author.toObject(),
        name: user.name, // Assuming 'name' is a field in the User model
      },
    }));

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts: postsWithAuthorName,
    });
  } catch (err) {
    // Pass the error to the next middleware for handling
    next(err);
  }
};

export default getPostByUserId;
