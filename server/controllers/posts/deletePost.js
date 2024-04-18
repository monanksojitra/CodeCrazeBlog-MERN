import { deleteFile } from "../../constants/cloudinaryconfig.js";
import { Post } from "../../models/Post.js";

const deletePostByPostId = async (req, res) => {
  try {
    const {
      params: { id },
      auth: { uid },
    } = req;

    if (!id) return res.status(400).json({ message: "Id is required" });

    const data = await Post.findByIdAndDelete({ _id: id, author: uid });

    if (!data) return res.status(404).json({ message: "Post not found" });

    const status = await deleteFile(data.filename);

    if (!status) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({
      message: "Post deleted",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      massage: "Something went wrong",
      error: err.message,
    });
  }
};

export default deletePostByPostId;
