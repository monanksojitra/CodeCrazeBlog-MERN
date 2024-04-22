import { authorizeBearerToken } from "./middlewares/jsonwebtoken.js";
import connectDB from "./models/Db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import app from "./utils/app.js";

connectDB();
// app.use("/", getProperty);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  return res.send("Hello World");
});
app.use("/post", [authorizeBearerToken], postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});
