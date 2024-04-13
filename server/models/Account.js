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
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Define property schema
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  rooms: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Define inquiry schema
const inquirySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define favorite schema
const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Create mongoose models
const User = mongoose.model("User", userSchema);
const Property = mongoose.model("Property", propertySchema);
const Inquiry = mongoose.model("Inquiry", inquirySchema);
const Favorite = mongoose.model("Favorite", favoriteSchema);

export { User, Property, Inquiry, Favorite };
