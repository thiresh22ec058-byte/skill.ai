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
  link: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,

  skills: [String],

  careerGoal: String,
  stream: String,
  year: String,

  roadmapProgress: [roadmapSchema],
  projects: [projectSchema]
});

const User = mongoose.model("User", userSchema);

export default User;