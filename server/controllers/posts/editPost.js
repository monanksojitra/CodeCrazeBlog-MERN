import fs from "fs";
import { deleteFile, uploadFile } from "../../constants/cloudinaryconfig.js";
import { Post } from "../../models/Post.js";

const updatePost = async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, description },
      file: { path },
      auth: { uid },
    } = req;

    if (!id) return res.status(400).json({ message: "Id is required" });
    if (!title || !description)
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    if (!path)
      return res.status(400).json({ message: "Cover image is required" });

    const post = await Post.findOne({ _id: id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.author.toString() !== uid)
      return res.status(403).json({ message: "Unauthorized" });

    const deleteResult = await deleteFile(post.filename);
    if (deleteResult !== "ok")
      return res.status(500).json({ message: "Failed to delete the old file" });

    const uploadResult = await uploadFile({ path, folder: "post" });
    fs.unlinkSync(path);

    if (!uploadResult.public_id || !uploadResult.url)
      return res.status(500).json({ message: "Failed to upload the new file" });

    const updateData = await Post.updateOne(
      { _id: id },
      {
        title,
        description,
        filename: uploadResult.public_id,
        filepath: uploadResult.url,
      }
    );

    if (!updateData) return res.status(404).json({ message: "Post not found" });

    return res
      .status(200)
      .json({ message: "Post updated successfully", data: updateData });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default updatePost;
