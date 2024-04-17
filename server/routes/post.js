import express from "express";
import getAllPosts from "../controllers/posts/getAllPosts.js";
import path from "path";
import multer from "multer";
import createPost from "../controllers/posts/createPost.js";
import editPost from "../controllers/posts/editPost.js";

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

const router = express.Router();

router.get("/", getAllPosts);

router.post("/add", upload.single("cover"), createPost);

router.patch("/:id", upload.single("cover"), editPost);

export default router;
