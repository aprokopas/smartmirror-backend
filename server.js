import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/api/test", (req, res) => {
    res.json({
        status: "OK",
        message: "SmartMirror API is running on Render!"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port", PORT);
});
