import express from "express";
import Dashboard from "../models/Dashboard.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Load dashboard
router.get("/", auth, async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne({ userId: req.user.id });

    if (!dashboard) {
      // create empty dashboard for user
      dashboard = await Dashboard.create({
        userId: req.user.id,
        widgets: []
      });
    }

    res.json(dashboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save dashboard (overwrite)
router.post("/", auth, async (req, res) => {
  try {
    const { widgets } = req.body;

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.user.id },
      { widgets, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    res.json({ message: "Dashboard saved", dashboard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/update", auth, async (req, res) => {
  const userId = req.user.id;
  const { widgets } = req.body;

  await Dashboard.updateOne(
    { userId },
    { $set: { widgets } },
    { upsert: true }
  );

  res.json({ message: "Dashboard updated" });
});

export default router;
