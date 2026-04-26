import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ✅ import ROUTES (not models)
import empRoutes from "./Routes/employee.js";
import reviewRoutes from "./Routes/review.js";
import feedbackRoutes from "./Routes/feedback.js";

const app = express();

// ✅ CORS (this alone is enough)
app.use(cors());

// ✅ body parser
app.use(express.json());

// ✅ DB connect
await mongoose
  .connect("mongodb://127.0.0.1:27017/reviewApp")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// ✅ use ROUTES
app.use("/emp", empRoutes);
app.use("/review", reviewRoutes);
app.use("/feedback", feedbackRoutes);

// ✅ test route (optional but useful)
app.get("/", (req, res) => {
  res.send("server working");
});

// ✅ start server
app.listen(4000, () => console.log("server running"));