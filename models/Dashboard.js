import mongoose from "mongoose";

const widgetSchema = new mongoose.Schema({
  type: { type: String, required: true },  // π.χ. "clock", "weather", "rss"
  config: { type: Object, default: {} },   // ρυθμίσεις widget
  x: Number,  // θέση στο dashboard
  y: Number,
  w: Number,  // width
  h: Number   // height
});

const dashboardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  widgets: [widgetSchema],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Dashboard", dashboardSchema);
