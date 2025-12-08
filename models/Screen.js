import mongoose from "mongoose";

const screenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    screenName: {
      type: String,
      required: true
    },
    screenKey: {
      type: String,
      required: true,
      unique: true
    },
    widgets: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Screen", screenSchema);
