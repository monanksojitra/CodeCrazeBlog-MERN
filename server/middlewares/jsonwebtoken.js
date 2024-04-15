import jwt from "jsonwebtoken";
import config from "../constants/config.js";

const signToken = async (payload = {}, expiresIn = "12h") => {
  try {
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error signing token:", error);
    throw new Error("Error signing token");
  }
};

const authorizeBearerToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Token not provided or invalid format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    try {
      const auth = jwt.verify(token, config.JWT_SECRET);
      req.auth = auth;
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(401).json({ message: "Unauthorized - invalid token" });
    }
  } catch (error) {
    console.error("Error in authorization middleware:", error.massage);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { signToken, authorizeBearerToken };
