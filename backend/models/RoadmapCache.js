// backend/models/RoadmapCache.js

import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    goal: { type: String, required: true },
    skillLevel: { type: String, required: true },
    dailyHours: { type: Number, required: true },
    currentSkills: { type: [String], default: [] },
    roadmapData: { type: Object, required: true }
  },
  { timestamps: true }
);

// Compound index for better caching
roadmapSchema.index({ goal: 1, skillLevel: 1, dailyHours: 1 });

export default mongoose.model("RoadmapCache", roadmapSchema);