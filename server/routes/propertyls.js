import express from "express";
import login from "../controllers/auth/login.js";
import registerUser from '../controllers/auth/register.js'
import loginWithToken from "../controllers/auth/login-with-token.js";
import { authorizeBearerToken } from "../middlewares/jsonwebtoken.js";
import getAllProperty from "../controllers/propertys/getAllProperty.js";

// initialize router
const router = express.Router();

// POST at route: http://localhost:8080/auth/register
router.get("/property", getAllProperty);


export default router;
