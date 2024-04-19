import express from "express";
import login from "../controllers/auth/login.js";
import registerUser from "../controllers/auth/register.js";
import loginWithToken from "../controllers/auth/login-with-token.js";
import { authorizeBearerToken } from "../middlewares/jsonwebtoken.js";
import deleteProfile from "../controllers/auth/deleteProfile.js";

// initialize router
const router = express.Router();

// POST at route: http://localhost:8080/auth/register
router.post("/register", registerUser);

// POST at path: http://localhost:8080/auth/login
router.post("/login", login);

// GET at path: http://localhost:8080/auth/account
router.get("/login", [authorizeBearerToken], loginWithToken);

router.delete("/profile", [authorizeBearerToken], deleteProfile);

export default router;
