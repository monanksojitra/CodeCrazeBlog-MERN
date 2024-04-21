import { User } from "../../models/Account.js";
import { signToken } from "../../middlewares/jsonwebtoken.js";

async function loginWithToken(request, response, next) {
  try {
    const { uid } = request.auth;

    if (!uid) {
      return response
        .status(401)
        .json({ message: "Unauthorized - invalid token" });
    }

    // Get account from DB, existence not verified because we are already authorized at this point
    const foundAccount = await User.findOne({ _id: uid }).select("-password");

    if (!foundAccount) {
      return response.status(404).json({ message: "Account not found" });
    }

    // Generate access token
    const token = signToken({ uid: foundAccount._id });

    response.status(200).json({
      message: "Account fetched",
      data: foundAccount,
      token,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
}

export default loginWithToken;
