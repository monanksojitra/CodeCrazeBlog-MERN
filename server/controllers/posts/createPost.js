import fs from "fs";
import { uploadFile } from "../../constants/cloudinaryconfig.js";
import { User } from "../../models/Account.js";
import { Post } from "../../models/Post.js";

const createPost = async (req, res) => {
  try {
    const {
      auth: { uid },
      body: { title, description },
      file,
    } = req;
    console.log(file);
    // console.log("this is ", file);
    const { username } = await User.findById({ _id: uid });

    // Validate input
    if (!title || !description || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await uploadFile({ file, folderName: "covers" });
    const newPost = new Post({
      title,
      description,
      filepath: result.url,
      author: uid,
      username: username,
      filename: result.public_id,
    });

    // Save the new Post to the database
    // Assuming there's a save method on the Post model
    await newPost.save();
    fs.unlinkSync(file.path);
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
