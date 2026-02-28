import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  week: String,
  topics: [String],
  status: {
    type: String,
    enum: ["locked", "in-progress", "completed"],
    default: "locked"
  }
});

const projectSchema = new mongoose.Schema({
  title: String,
  type: {
    type: String,
    enum: ["software", "hardware"],
    default: "software"
  },
  link: String,
  file: String, // base64 for hardware uploads
  completed: {
    type: Boolean,
    default: true
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  role: {
    type: String,
    default: "Student"
  },

  profilePhoto: {
    type: String,
    default: ""
  },

  skills: [String],

  careerGoal: String,

  roadmapProgress: [roadmapSchema],
  projects: [projectSchema]
});

export default mongoose.model("User", userSchema);