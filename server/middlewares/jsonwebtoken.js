import jwt from "jsonwebtoken";
import { User } from "../models/Account.js";
import configs from "../constants/config.js";

const signToken = (payload = {}, expiresIn = "12h") => {
  const token = jwt.sign(payload, configs.JWT_SECRET, { expiresIn });

  return token;
};

const authorizeBearerToken = (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return response.status(400).json({
        message: "Token not provided",
      });
    }
    const auth = jwt.verify(token, configs.JWT_SECRET);
    if (!auth) {
      return response.status(401).json({
        message: "Unauthorized - invalid token",
      });
    }
    const isUserExist = User.findOne({ _id: auth.uid });
    if (!isUserExist) {
      return response.status(401).json({
        message: "Unauthorized - invalid token",
      });
    }
    request.auth = auth;
    next();
  } catch (error) {
    console.error(error);
    return response.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }
};

export { signToken, authorizeBearerToken };
