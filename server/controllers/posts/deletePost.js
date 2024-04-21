import { deleteFile } from "../../constants/cloudinaryconfig.js";
import { Post } from "../../models/Post.js";

const deletePostByPostId = async (req, res) => {
  try {
    const {
      params: { id },
      auth: { uid },
    } = req;

    if (!id) return res.status(400).json({ message: "Id is required" });

    const post = await Post.findOneAndDelete({ _id: id, author: uid });

    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found or you are not the author" });

    const deleteStatus = await deleteFile(post.filename);

    if (!deleteStatus)
      return res
        .status(500)
        .json({ message: "Failed to delete the file from the server" });

    return res.status(200).json({
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default deletePostByPostId;
