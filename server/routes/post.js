import express from "express";
import getAllPosts from "../controllers/posts/getAllPosts.js";
import createPost from "../controllers/posts/addNewPost.js";
import path from "path";
import multer from "multer";

// const upload = multer({ dest: path.resolve("./uploads") });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
// initialize router
const router = express.Router();

// POST at route: http://localhost:8080/auth/register
router.get("/", getAllPosts);
router.post("/add", upload.single("file"), createPost);

export default router;
