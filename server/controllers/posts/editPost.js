import fs from "fs";
import { deleteFile, uploadFile } from "../../constants/cloudinaryconfig.js";
import { Post } from "../../models/Post.js";
const updatePost = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
    file: { path },
    auth: { uid },
  } = req;

  const { filename, author } = await Post.findOne({ _id: id });
  if (uid !== author) return res.status(400).json({ message: "Unauthorized" });
  if (!id) return res.status(400).json({ message: "Id is required" });
  if (!title || !description)
    return res
      .status(400)
      .json({ message: "title and description are required" });
  if (!path)
    return res.status(400).json({ message: "Cover image is required" });

  const { result } = await deleteFile(filename);

  //   console.log("this is delete filr :", isDeleted);
  //   res.status(200).json({ message: "Post updated" });
  if (result !== "ok")
    return res.status(404).json({ message: "Post not found" });

  const { public_id, url } = await uploadFile({ path, folder: "post" });
  fs.unlinkSync(path);

  const data = await Post.updateOne(
    { _id: id },
    {
      title,
      description,
      filename: public_id,
      filepath: url,
    }
  );
  if (!data) return res.status(404).json({ message: "Post not found" });

  return res.status(200).json({ message: "Post updated", data: data });
};

export default updatePost;
