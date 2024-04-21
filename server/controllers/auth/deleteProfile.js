import { User } from "../../models/Account.js";
import { Post } from "../../models/Post.js";

const deleteProfile = async (req, res) => {
  const { uid } = req.auth;
  const isExist = await User.exists({ _id: uid });
  if (isExist) {
    await User.deleteOne({ _id: uid });
    await Post.deleteMany({ author: uid });

    return res.status(200).json({ message: "Profile and posts deleted" });
  }
  return res.status(200).json({ message: "Soothing went wrong" });
};
export default deleteProfile;
