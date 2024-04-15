import { Post } from "../../models/Post.js";

const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      auth: { uid },
      body: { title, description },
      file,
    } = req;
    const isPostExist = await Post.findById({ _id: id });
    if (!isPostExist && uid !== isPostExist.author)
      return res.status(404).json({ message: "Something went wrong" });
    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "covers",
      });
    }
    Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    ).then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "Something went wrong Please try again",
        });
      }
      return res.status(200).json({
        message: "Post updated",
        data,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default editPost;
