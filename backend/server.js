import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { normalizeGoal } from "./config/careerDomains.js";   // ✅ must be at top

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ✅ STEP 3 CODE GOES HERE
app.post("/api/analyze", (req, res) => {
  const { goal } = req.body;

  const domain = normalizeGoal(goal);

  let roadmap = [
    {
      title: `Week 1-2: Introduction to ${domain}`,
      courses: [
        {
          name: `${domain} Basics`,
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ]
    }
  ];

  res.json({
    career: goal,
    domain,
    skillGap: `Build strong fundamentals in ${domain}`,
    roadmap,
    progress: 0
  });
});


// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});