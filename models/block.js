import mongoose from "mongoose";

const blockSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },

  owner: { type: String, default: null },
  color: { type: String, default: null },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

blockSchema.index({ x: 1, y: 1 }, { unique: true });

export default mongoose.model("Block", blockSchema);
