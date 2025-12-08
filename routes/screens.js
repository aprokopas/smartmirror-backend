import express from "express";
import auth from "../middleware/auth.js";
import Screen from "../models/Screen.js";
import User from "../models/User.js";
import crypto from "crypto";

const router = express.Router();

// ------------------------------------
// GET ALL SCREENS
// ------------------------------------
router.get("/list", auth, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  const screens = await Screen.find({ userId });

  res.json({
    screens,
    maxScreens: user.maxScreens
  });
});

// ------------------------------------
// ADD SCREEN
// ------------------------------------
router.post("/add", auth, async (req, res) => {
  const userId = req.user.id;
  const { screenName } = req.body;

  const user = await User.findById(userId);
  const currentScreens = await Screen.countDocuments({ userId });

  if (currentScreens >= user.maxScreens) {
    return res.status(403).json({
      message: `Your plan allows only ${user.maxScreens} screens`
    });
  }

  const screen = await Screen.create({
    userId,
    screenName,
    screenKey: crypto.randomBytes(16).toString("hex")
  });

  res.json({ screen });
});

// ------------------------------------
// DELETE SCREEN
// ------------------------------------
router.delete("/delete/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const screenId = req.params.id;

  await Screen.deleteOne({ _id: screenId, userId });

  res.json({ message: "Screen deleted" });
});

export default router;
