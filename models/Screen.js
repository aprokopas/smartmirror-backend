import mongoose from "mongoose";

const ScreenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  screenName: String,
  screenKey: {
    type: String,
    unique: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Screen", ScreenSchema);
