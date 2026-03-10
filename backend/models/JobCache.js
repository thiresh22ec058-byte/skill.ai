import mongoose from "mongoose";

const jobCacheSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    jobs: [
      {
        title: String,
        company: String,
        location: String,
        redirect: String
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("JobCache", jobCacheSchema);