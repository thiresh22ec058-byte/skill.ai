import mongoose from "mongoose";

const aiUsageSchema = new mongoose.Schema(
  {
    roadmapCount: {
      type: Number,
      default: 0,
    },
    lastRoadmapDate: {
      type: Date,
      default: null,
    },
    totalAIGenerations: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    // 🔥 Premium System
    isPremium: {
      type: Boolean,
      default: false,
    },

    subscriptionExpiry: {
      type: Date,
      default: null,
    },

    // 🔥 AI Usage Tracking
    aiUsage: {
      type: aiUsageSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);