import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { json, urlencoded } from "express";

dotenv.config();
const app = express();

// Middleware setup
app.use(
  cors({
    origin: "http://localhost:5173/",
    credentials: true,
  })
);

app.use(json()); // Body parser
app.use(urlencoded({ extended: false })); // URL parser

// Routes and other middleware should be defined here
// For example:
// app.use('/api', apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    status: "error",
    message: err.message,
    path: req.path,
  });
});

export default app;
