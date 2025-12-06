import express from "express";
import Dashboard from "../models/Dashboard.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * Add new widget to user dashboard
 */
router.post("/add", auth, async (req, res) => {
  const { type, config, x, y, w, h } = req.body;

  try {
    let dashboard = await Dashboard.findOne({ userId: req.user.id });

    if (!dashboard) {
      dashboard = await Dashboard.create({
        userId: req.user.id,
        widgets: []
      });
    }

    const newWidget = {
      type,
      config,
      x: x || 0,
      y: y || 0,
      w: w || 2,
      h: h || 2
    };

    dashboard.widgets.push(newWidget);
    await dashboard.save();

    res.json({ message: "Widget added", widget: newWidget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Remove widget by index
 */
router.post("/remove", auth, async (req, res) => {
  const { index } = req.body;

  try {
    const dashboard = await Dashboard.findOne({ userId: req.user.id });

    dashboard.widgets.splice(index, 1);
    await dashboard.save();

    res.json({ message: "Widget removed", widgets: dashboard.widgets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
