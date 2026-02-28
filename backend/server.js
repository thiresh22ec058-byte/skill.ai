import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

import { normalizeGoal, domainSkills } from "./config/careerDomains.js";
import PlaylistCache from "./models/PlaylistCache.js";
import User from "./models/User.js";

import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/uploads", express.static("uploads"));

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* ================= ROUTES ================= */
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);

/* ================= JOBS API ================= */
app.get("/api/jobs", async (req, res) => {
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
  } catch (err) {
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
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const domain = normalizeGoal(goal);
    const requiredSkills = domainSkills[domain] || [];
    const userSkills = user.skills || [];

    const lowerUserSkills = userSkills.map((s) =>
      s.toLowerCase()
    );

    const matchedSkills = [];
    const skillsMissing = [];

    requiredSkills.forEach((skill) => {
      const match = lowerUserSkills.some((u) =>
        u.includes(skill.toLowerCase())
      );
      if (match) matchedSkills.push(skill);
      else skillsMissing.push(skill);
    });

    /* ================= PLAYLIST CACHE ================= */

    let cached = await PlaylistCache.findOne({ goal });
    let roadmap;
    let playlistId;

    if (cached && cached.roadmap?.length > 0) {
      roadmap = cached.roadmap;
      playlistId = cached.playlistId;
    } else {

      /* 🔥 ENGLISH PRIORITY SEARCH */
      const searchResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: `${goal} full complete course playlist English`,
            type: "playlist",
            maxResults: 1,
            relevanceLanguage: "en",
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );

      if (!searchResponse.data.items.length) {
        return res.status(404).json({
          message: "No playlist found"
        });
      }

      playlistId =
        searchResponse.data.items[0].id.playlistId;

      /* GET PLAYLIST VIDEOS */
      const playlistItems = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet,contentDetails",
            playlistId,
            maxResults: 20,
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );

      roadmap = playlistItems.data.items.map(
        (item, index) => ({
          week: index + 1,
          videos: [
            {
              title: item.snippet.title,
              videoId:
                item.contentDetails.videoId
            }
          ]
        })
      );

      /* ✅ SAVE WITH PLAYLIST ID */
      await PlaylistCache.findOneAndUpdate(
        { goal },
        {
          goal,
          playlistId,
          roadmap
        },
        { upsert: true }
      );
    }

    /* ================= USER ROADMAP ================= */

    user.careerGoal = goal;

    user.roadmapProgress = skillsMissing.map(
      (skill, index) => ({
        week: `Week ${index + 1}`,
        topics: [skill],
        status:
          index === 0 ? "in-progress" : "locked"
      })
    );

    await user.save();

    res.json({
      career: goal,
      skillsMissing,
      playlistId,
      roadmap
    });

  } catch (error) {
    console.error("Analyze Error:", error.message);
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