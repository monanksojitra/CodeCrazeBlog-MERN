import { v2 as cloudinary } from "cloudinary";
import config from "../../constants/config.js";
import { Post } from "../../models/Post.js";

const createPost = async (req, res) => {
  try {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: config.CLOUDINARY_CLOUD_NAME,
      api_key: config.CLOUDINARY_API_KEY,
      api_secret: config.CLOUDINARY_API_SECRET,
    });

    // Destructure request body and file
    const {
      auth: { uid },
      body: { title, description },
      file,
    } = req;

    // Validate input
    if (!title || !description || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "covers",
    });
    const coverUrl = result.url;

    // Create a new Post
    const newPost = new Post({
      title,
      description,
      image: coverUrl,
      author: uid,
    });

    // Save the new Post to the database
    // Assuming there's a save method on the Post model
    await newPost.save();

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
