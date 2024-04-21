import Joi from "joi";
import bcrypt from "bcrypt";
import { User } from "../../models/Account.js";
import { signToken } from "../../middlewares/jsonwebtoken.js";

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp(process.env.PASSWORDREGEX))
    .required(),
  email: Joi.string().email().required(),
});

async function registerUser(request, response) {
  try {
    // Validate request data
    const { username, password, email } = request.body;
    const { error } = schema.validate({ username, password, email });
    if (error) {
      return response.status(400).json({
        error: "ValidationError",
        message: error.message,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error during validation",
      error: error.message,
    });
  }

  try {
    const { username, password, email } = request.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return response.status(400).json({
        message: "Username or Email already exists",
      });
    }

    // Check if maximum number of users has been reached
    const userCount = await User.countDocuments();
    if (userCount >= 10) {
      return response.status(400).json({
        message: "Maximum number of users reached. Please try again later",
      });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await new User({ username, password: hash, email });
    await newUser.save();

    // Generate access token
    const token = await signToken({ uid: newUser._id });

    response.status(201).json({
      message: "Successfully registered",
      token,
      data: { username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    return response.status(500).json({
      message: "Internal server error during registration",
      error: error.message,
    });
  }
}

export default registerUser;
