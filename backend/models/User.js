import mongoose from "mongoose";

/* ================= AI USAGE SCHEMA ================= */

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

/* ================= ROADMAP PROGRESS SCHEMA ================= */

const roadmapProgressSchema = new mongoose.Schema(
  {
    goal: {
      type: String,
      default: null,
    },

    completedPhases: {
      type: [Number],
      default: [],
    },

    currentPhase: {
      type: Number,
      default: 1,
    },

    progressPercent: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

/* ================= PROJECT SCHEMA ================= */

const projectSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    link: String,
    file: String
  },
  { _id: false }
);

/* ================= USER SCHEMA ================= */

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

    /* ===== User Skills ===== */

    skills: {
      type: [String],
      default: [],
    },

    /* ===== Career Goal ===== */

    careerGoal: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    /* ===== Premium System ===== */

    isPremium: {
      type: Boolean,
      default: false,
    },

    subscriptionExpiry: {
      type: Date,
      default: null,
    },

    /* ===== AI Usage Tracking ===== */

    aiUsage: {
      type: aiUsageSchema,
      default: () => ({}),
    },

    /* ===== Roadmap Learning Progress ===== */

    roadmapProgress: {
      type: roadmapProgressSchema,
      default: () => ({}),
    },

    /* ===== PROJECTS (FIX FOR YOUR ERROR) ===== */

    projects: {
      type: [projectSchema],
      default: []
    }

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);