import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: String,
  type: String,
  link: String,
  file: String
});

const profileSchema = new mongoose.Schema({

  name: String,
  role: String,
  careerGoal: String,
  profilePhoto: String,

  roadmapProgress: {
    type: Array,
    default: []
  },

  projects: [projectSchema],

  stats: {
    completedWeeks: Number,
    completedProjects: Number,
    progressPercent: Number
  }

});

export default mongoose.model("Profile", profileSchema);