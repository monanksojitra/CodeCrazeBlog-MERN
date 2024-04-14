const createPost = async (request, response) => {
  try {
    const { uid } = request;
    const newPost = await new Post({
      title,
      description,
      image: request.file.path,
      author: uid,
    });
    if (!newPost)
      return response.status(404).json({ message: "Error creating post" });
    response.status(201).json({
      message: "Post created",
    });
  } catch (error) {}
};
export default createPost;
