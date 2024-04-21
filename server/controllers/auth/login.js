import Joi from "joi";
import { User } from "../../models/Account.js";
import { signToken } from "../../middlewares/jsonwebtoken.js";
import bcrypt from "bcrypt";

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "Username must be a type of text",
    "string.alphanum": "Username can only contain letters and numbers",
    "string.min": "Username must have a minimum length of {#limit}",
    "string.max": "Username must have a maximum length of {#limit}",
    "any.required": "Username is a required field",
  }),
  password: Joi.string()
    .pattern(new RegExp(process.env.PASSWORDREGEX))
    .required()
    .messages({
      "string.base": "Password must be a type of text",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and must be at least 8 characters long",
      "any.required": "Password is a required field",
    }),
});

async function loginUser(request, response, next) {
  try {
    // Validate request data
    await loginSchema.validateAsync(request.body);
  } catch (error) {
    return response.status(400).json({
      error: "ValidationError",
      message: error.message,
    });
  }

  try {
    const { username, password } = request.body;

    // Get account from DB, and verify existence
    const foundAccount = await User.findOne({ username });
    if (!foundAccount) {
      return response.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Decrypt and verify password
    const passOk = await bcrypt.compare(password, foundAccount.password);
    if (!passOk) {
      return response.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Remove password from response data
    foundAccount.password = undefined;
    delete foundAccount.password;

    // Generate access token
    const token = await signToken({ uid: foundAccount._id });
    response.status(200).json({
      message: "Successfully logged in",
      data: foundAccount,
      token: token,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Internal server error" });
  }
}

export default loginUser;
