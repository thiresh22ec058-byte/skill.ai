import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  phase: Number,
  name: String,
  duration: String,
  playlist: String
});

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  domain: String,
  description: String,

  requiredSkills: [String],

  roadmap: [roadmapSchema]

});

export default mongoose.model("Career", careerSchema);