import express from "express";
import cors from "cors";

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // body parser
app.use(express.urlencoded({ extended: false })); // url parser

// error handling
app.use((err, req, res, next) => {
  console.error("this is error : ", err);
  res.status(500).send();
  next();
});
export default app;
