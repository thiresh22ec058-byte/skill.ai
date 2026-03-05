import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

/* ================= IMPORT MODELS ================= */

import User from "./models/User.js";

/* ================= IMPORT CONFIG ================= */

import { normalizeGoal, domainSkills } from "./config/careerDomains.js";

/* ================= IMPORT ROUTES ================= */

import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import skillGapRoutes from "./routes/skillGapRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import explorerRoutes from "./routes/explorerRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import jobReadinessRoutes from "./routes/jobReadinessRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

/* ================= ENV ================= */

dotenv.config();

/* ================= APP ================= */

const app = express();

/* ================= PATH FIX ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* ================= ROUTES ================= */

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/explorer", explorerRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/job-readiness", jobReadinessRoutes);
app.use("/api/resume", resumeRoutes);

/* AI ENGINE ROUTES */

app.use("/api/ai", aiRoutes);

/* ================= JOBS API ================= */

app.get("/api/jobs", (req, res) => {

  try {

    const readiness = Number(req.query.readiness);
    const domain = req.query.domain || "Professional";

    let jobs = [];

    if (readiness < 40) {

      jobs = [
        `${domain} Intern`,
        `Junior ${domain} Associate`,
        `${domain} Trainee`
      ];

    } else if (readiness < 70) {

      jobs = [
        `${domain} Analyst`,
        `${domain} Executive`,
        `${domain} Consultant`
      ];

    } else {

      jobs = [
        `Senior ${domain} Developer`,
        `${domain} Manager`,
        `${domain} Team Lead`,
        `${domain} Specialist`
      ];

    }

    res.json(jobs);

  } catch (error) {

    console.error("Jobs API Error:", error);

    res.status(500).json({ message: "Server Error" });

  }

});

/* ================= ANALYZE ROUTE ================= */

app.post("/api/analyze", async (req, res) => {

  try {

    const { goal, userId } = req.body;

    if (!goal || !userId) {
      return res.status(400).json({
        message: "Goal and userId required"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const domain = normalizeGoal(goal);

    const requiredSkills = domainSkills[domain] || [];

    const userSkills = user.skills || [];

    const lowerUserSkills = userSkills.map(s => s.toLowerCase());

    const matchedSkills = [];
    const skillsMissing = [];

    requiredSkills.forEach(skill => {

      const isMatch = lowerUserSkills.some(u =>
        u.includes(skill.toLowerCase())
      );

      if (isMatch) matchedSkills.push(skill);
      else skillsMissing.push(skill);

    });

    const progress =
      requiredSkills.length > 0
        ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
        : 0;

    user.careerGoal = goal;

    const roadmap = [];

    for (let i = 0; i < skillsMissing.length; i++) {

      const skill = skillsMissing[i];

      let playlistLink = "";

      try {

        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: `${skill} full course playlist`,
              type: "playlist",
              maxResults: 1,
              key: process.env.YOUTUBE_API_KEY
            }
          }
        );

        if (response.data.items.length > 0) {

          const playlistId = response.data.items[0].id.playlistId;

          playlistLink =
            `https://www.youtube.com/playlist?list=${playlistId}`;

        }

      } catch (err) {

        console.log("YouTube API Error:", err.message);

      }

      roadmap.push({
        week: `Week ${i + 1}`,
        topics: [skill],
        playlist: playlistLink,
        status: i === 0 ? "in-progress" : "locked"
      });

    }

    user.roadmapProgress = roadmap;

    await user.save();

    res.json({
      career: goal,
      domain,
      skillsHave: userSkills,
      skillsMissing,
      progress
    });

  } catch (error) {

    console.error("Analyze Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);