import express from "express";
import getAllPosts from "../controllers/posts/getAllPosts.js";
import path from "path";
import createPost from "../controllers/posts/createPost.js";
import editPost from "../controllers/posts/editPost.js";
import multer from "multer";
import deletePostByPostId from "../controllers/posts/deletePost.js";

// const upload = multer({ dest: path.resolve("./uploads") });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", getAllPosts);

router.post("/add", upload.single("file"), createPost);

router.put("/:id", upload.single("file"), editPost);

router.delete("/:id", deletePostByPostId);

export default router;
