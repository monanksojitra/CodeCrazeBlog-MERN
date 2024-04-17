import { deleteFile } from "../../constants/cloudconnect.js";
import { BlogPost } from "../../models/bloger.js";

const deletePostByPostId = async (req, res) => {
  try {
    const {
      params: { id },
      auth: { uid },
    } = req;

    if (!id) return res.status(400).json({ message: "Id is required" });

    const data = await BlogPost.findByIdAndDelete({ _id: id, author: uid });

    if (!data) return res.status(404).json({ message: "Post not found" });

    const status = await deleteFile(data.filename);

    if (!status) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({
      message: "Post deleted",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default deletePostByPostId;
