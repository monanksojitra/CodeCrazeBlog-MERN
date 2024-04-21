import { User } from "../../models/Account.js";
import { Post } from "../../models/Post.js";

const deleteProfile = async (req, res) => {
  try {
    const { uid } = req.auth;
    const isExist = await User.exists({ _id: uid });

    if (!isExist) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: uid });
    await Post.deleteMany({ author: uid });

    return res
      .status(200)
      .json({ message: "Profile and posts deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default deleteProfile;
