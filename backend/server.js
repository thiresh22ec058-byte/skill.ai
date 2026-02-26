import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";

import { normalizeGoal, domainSkills } from "./config/careerDomains.js";
import PlaylistCache from "./models/PlaylistCache.js";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// ================= ANALYZE ROUTE =================
app.post("/api/analyze", async (req, res) => {
  try {
    const { goal, userId } = req.body;

    if (!goal || !userId) {
      return res.status(400).json({ message: "Goal and User ID required" });
    }

    // 1️⃣ Fetch user from DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userSkills = user.skills || [];

    // 2️⃣ Detect domain
    const domain = normalizeGoal(goal);
    const requiredSkills = domainSkills[domain] || [];

    const lowerUserSkills = userSkills.map(skill =>
      skill.toLowerCase()
    );

    const skillsHave = [];
    const skillsMissing = [];
    const skillsImprove = [];

    requiredSkills.forEach(skill => {
      if (lowerUserSkills.includes(skill.toLowerCase())) {
        skillsHave.push(skill);
      } else {
        skillsMissing.push(skill);
      }
    });

    if (skillsHave.length > 0) {
      skillsImprove.push("Advanced Practice");
    }

    // ================= CACHING STRATEGY =================

    // 3️⃣ Check if playlist already cached
    let cached = await PlaylistCache.findOne({ goal });

    let playlists;

    if (cached) {
      playlists = cached.roadmap;
    } else {

      // 4️⃣ Call YouTube API
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: `${goal} complete course playlist beginner to advanced`,
            type: "playlist",
            maxResults: 5,
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );

      const filtered = response.data.items.filter(item =>
        !item.snippet.title.toLowerCase().includes("exam") &&
        !item.snippet.title.toLowerCase().includes("rgpv") &&
        !item.snippet.title.toLowerCase().includes("hindi")
      );

      playlists = filtered.slice(0, 3).map(item => ({
        title: item.snippet.title,
        playlist: `https://www.youtube.com/playlist?list=${item.id.playlistId}`
      }));

      // 5️⃣ Save to cache
      await PlaylistCache.create({
        goal,
        domain,
        roadmap: playlists
      });
    }

    // ================= FINAL RESPONSE =================

    res.json({
      career: goal,
      domain,
      skillsHave,
      skillsMissing,
      skillsImprove,
      roadmap: playlists,
      progress: 0
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


// ================= START SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});