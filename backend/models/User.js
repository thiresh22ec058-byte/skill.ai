import mongoose from "mongoose";

/* ================= ROADMAP SCHEMA ================= */
const roadmapSchema = new mongoose.Schema({
  week: {
    type: String,
    required: true
  },
  topics: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ["locked", "in-progress", "completed"],
    default: "locked"
  }
});

/* ================= PROJECT SCHEMA ================= */
const projectSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: ["software", "hardware"],
    default: "software"
  },
  link: String,
  file: String, // base64 file (for hardware uploads)
  completed: {
    type: Boolean,
    default: true
  }
});

/* ================= USER SCHEMA ================= */
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true
    },
    password: String,

    role: {
      type: String,
      default: "Student"
    },

    profilePhoto: {
      type: String,
      default: ""
    },

    skills: {
      type: [String],
      default: []
    },

    careerGoal: {
      type: String,
      default: ""
    },

    roadmapProgress: {
      type: [roadmapSchema],
      default: []
    },

    projects: {
      type: [projectSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);