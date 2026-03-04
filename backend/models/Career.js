import mongoose from "mongoose";

const phaseSchema = new mongoose.Schema({

  phase: Number,
  name: String,
  duration: String,

  topics: [
    {
      title: String,
      video: String
    }
  ],

  playlist: String,
  projectVideo: String,
  projects: [String]

}, { _id: false });


const salarySchema = new mongoose.Schema({

  country: String,
  currency: String,
  min: Number,
  max: Number

}, { _id: false });


const careerSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique: true
  },

  domain: {
    type: String,
    required: true
  },

  description: String,

  requiredSkills: [String],

  roadmap: [phaseSchema],

  demandLevel: {
    type: String,
    enum: ["low","medium","high"],
    default: "medium"
  },

  salaries: [salarySchema],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("Career", careerSchema);