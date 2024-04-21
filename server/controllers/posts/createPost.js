import fs from "fs";
import { uploadFile } from "../../constants/cloudinaryconfig.js";
import { User } from "../../models/Account.js";
import { Post } from "../../models/Post.js";

const createPost = async (req, res) => {
  try {
    const {
      auth: { uid },
      body: { title, description },
      file: { path },
    } = req;

    const user = await User.findById(uid).select("username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate input
    if (!title || !description || !path) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await uploadFile({ path, folderName: "covers" });
    if (!result) {
      return res.status(500).json({ message: "Failed to upload file" });
    }
    const newPost = await new Post({
      title,
      description,
      filepath: result.url,
      author: uid,
      username: user.username,
      filename: result.public_id,
    });
    if (!newPost) {
      return res.status(500).json({ message: "Failed to create post" });
    }

    // Save the new Post to the database
    await newPost.save();
    fs.unlinkSync(path);

    // Respond with success
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    // Log the error for debugging
    console.error(error);

    // Respond with error
    res
      .status(500)
      .json({ message: "An error occurred while creating the post" });
  }
};

export default createPost;
