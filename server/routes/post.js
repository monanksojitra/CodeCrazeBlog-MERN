import express from "express";
import getAllPosts from "../controllers/posts/getAllPosts.js";

// initialize router
const router = express.Router();

// POST at route: http://localhost:8080/auth/register
router.get("/", getAllPosts);

export default router;
