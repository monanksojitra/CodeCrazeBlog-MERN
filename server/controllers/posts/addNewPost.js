const createPost = async (request, response, next) => {
  try {
    const { title, description, image } = request.body;
    const { uid } = request.auth;

    const newPost = new Post({
      title,
      description,
      image,
      author: uid,
    });
  } catch (error) {}
};
