import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "smartmirror" })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("Mongo error:", err));

// Routes
app.use("/api/auth", authRoutes);

// Test
app.get("/api/test", (req, res) => {
  res.json({
    status: "OK",
    msg: "SmartMirror API is running with MongoDB!"
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
