import jwt from "jsonwebtoken";
import { User } from "../models/Account.js";

/**
 * Signs a JWT token with the given payload.
 * @param {Object} payload - The payload to be signed into the token.
 * @param {string} [expiresIn="12h"] - The expiration time for the token.
 * @returns {Promise<string>} The JWT token.
 */
const signToken = async (payload = {}, expiresIn = "12h") => {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn,
    });
    return token;
  } catch (error) {
    throw new Error("Error signing JWT token");
  }
};

const authorizeBearerToken = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return response.status(400).json({
        message: "Token not provided",
      });
    }
    const auth = await jwt.verify(token, process.env.JWT_SECRET);

    if (!auth) {
      return response.status(401).json({
        message: "Unauthorized - invalid token",
      });
    }

    const user = await User.findById(auth.uid);
    if (!user) {
      return response.status(401).json({
        message: "Unauthorized - user not found",
      });
    }

    // Attach user object to request for further processing
    request.user = user;
    request.auth = auth;

    next();
  } catch (error) {
    console.error("Error in authorization middleware:", error);
    return response.status(401).json({
      message: "Unauthorized - invalid token",
    });
  }
};

export { signToken, authorizeBearerToken };
