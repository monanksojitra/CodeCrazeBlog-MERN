import mongoose from "mongoose";

// Define MongoDB connection function

// Define user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postalcode: {
      type: Number,
    },
    password: {
      type: String,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create mongoose models
const User = mongoose.model("User", userSchema);

export { User };
