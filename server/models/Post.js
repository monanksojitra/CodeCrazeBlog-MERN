import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define schema for blog post
const BlogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    filename: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define schema for like
const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogPost: {
    type: Schema.Types.ObjectId,
    ref: "BlogPost",
    required: true,
  },
});

// Define schema for comment
const CommentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Define models
const Post = mongoose.model("BlogPost", BlogPostSchema);
const Like = mongoose.model("Like", LikeSchema);
const Comment = mongoose.model("Comment", CommentSchema);

export { Post, Like, Comment };
