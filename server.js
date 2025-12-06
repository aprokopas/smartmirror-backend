import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import widgetsRoutes from "./routes/widgets.js";

dotenv.config();

const app = express();   // <-- ΠΡΕΠΕΙ ΝΑ ΕΙΝΑΙ ΕΔΩ ΠΑΝΩ
app.use(cors());
app.use(express.json());

// TEST endpoint
app.get("/api/test", (req, res) => {
  res.json({
    status: "OK",
    msg: "SmartMirror API is running with MongoDB!"
  });
});

// Routes (ΜΕΤΑ ΤΟ app = express)
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/widgets", widgetsRoutes);

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
