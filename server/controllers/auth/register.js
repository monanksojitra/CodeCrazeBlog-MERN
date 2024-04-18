import joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../../models/Account.js";
import { signToken } from "../../middlewares/jsonwebtoken.js";
async function registerUser(request, response) {
  try {
    // Validate request data
    await joi
      .object({
        username: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().required(),
      })
      .validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }

  try {
    const { username, password, email } = request.body;
    if (!username || !password || !email) {
      return response
        .status(400)
        .json({ message: "Username or Email and password are required" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username, email });
    if (existingUser) {
      return response.status(400).json({
        message: "Username already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    // Create account
    const newAccount = new User({ username, password: hash, email });
    await newAccount.save();

    // Generate access token
    const token = await signToken({ uid: newAccount._id });
    response.status(201).json({
      message: "Succesfully registered",
      token,
    });
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error from registerUser",
      error: error.message,
    });
  }
}
export default registerUser;
