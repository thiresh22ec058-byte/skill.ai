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

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================= ROUTES ================= */

app.get("/api/jobs", async (req, res) => {
  try {
    const { readiness, domain } = req.query;

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

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* ================= HELPER FUNCTIONS ================= */

// Convert ISO duration to minutes
function convertISOToMinutes(iso) {
  const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  return hours * 60 + minutes + seconds / 60;
}

// Split videos into 5-hour weekly groups
function splitIntoWeeks(videos) {
  const WEEK_LIMIT = 300;
  let roadmap = [];
  let currentWeek = [];
  let total = 0;
  let weekNumber = 1;

  for (let video of videos) {
    const duration = convertISOToMinutes(video.duration);

    if (total + duration <= WEEK_LIMIT) {
      currentWeek.push({
        title: video.title,
        videoId: video.videoId,
        duration
      });
      total += duration;
    } else {
      roadmap.push({
        week: weekNumber,
        totalDuration: Math.round(total),
        videos: currentWeek
      });

      weekNumber++;
      currentWeek = [{
        title: video.title,
        videoId: video.videoId,
        duration
      }];
      total = duration;
    }
  }

  if (currentWeek.length > 0) {
    roadmap.push({
      week: weekNumber,
      totalDuration: Math.round(total),
      videos: currentWeek
    });
  }

  return roadmap;
}

/* ================= ANALYZE ROUTE ================= */

app.post("/api/analyze", async (req, res) => {
  try {
    const { goal, userId } = req.body;

    if (!goal || !userId) {
      return res.status(400).json({
        message: "Goal and User ID required"
      });
    }

    // Get user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const userSkills = user.skills || [];

    // Detect domain
    const domain = normalizeGoal(goal);
    const requiredSkills = domainSkills[domain] || [];

    const lowerUserSkills = userSkills.map((s) =>
      s.toLowerCase()
    );

    const matchedSkills = [];
    const skillsMissing = [];
    const skillsImprove = [];

    requiredSkills.forEach((skill) => {
      const match = lowerUserSkills.some(
        (userSkill) =>
          userSkill.includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill)
      );

      if (match) {
        matchedSkills.push(skill);
      } else {
        skillsMissing.push(skill);
      }
    });

    matchedSkills.forEach((skill) => {
      skillsImprove.push(`Improve ${skill}`);
    });

    /* ===== PLAYLIST CACHING ===== */

    let cached = await PlaylistCache.findOne({ goal });
    let roadmap;

    if (cached && cached.roadmap?.length > 0) {
      roadmap = cached.roadmap;
    } else {

      // Search Playlist
      const searchResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: `${goal} complete course playlist beginner to advanced`,
            type: "playlist",
            maxResults: 1,
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );

      if (!searchResponse.data.items.length) {
        return res.status(404).json({
          message: "No playlist found"
        });
      }

      const playlistId =
        searchResponse.data.items[0].id.playlistId;

      // Get playlist videos
      const playlistItems = await axios.get(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        {
          params: {
            part: "snippet,contentDetails",
            playlistId,
            maxResults: 50,
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );

      const videoIds =
        playlistItems.data.items.map(
          (item) => item.contentDetails.videoId
        );

      // Get durations
      const videosResponse = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            part: "contentDetails",
            id: videoIds.join(","),
            key: process.env.YOUTUBE_API_KEY
          }
        }
      );

      const durationMap = {};
      videosResponse.data.items.forEach((video) => {
        durationMap[video.id] =
          video.contentDetails.duration;
      });

      const videos =
        playlistItems.data.items.map((item) => ({
          title: item.snippet.title,
          videoId: item.contentDetails.videoId,
          duration:
            durationMap[item.contentDetails.videoId] ||
            "PT0M"
        }));

      roadmap = splitIntoWeeks(videos);

      await PlaylistCache.findOneAndUpdate(
        { goal },
        { goal, roadmap },
        { upsert: true }
      );
    }

    /* ===== SAVE CAREER GOAL + INITIAL ROADMAP IN USER ===== */

    user.careerGoal = goal;

  user.roadmapProgress = skillsMissing.map((skill, index) => ({
  week: `${index * 2 + 1}-${index * 2 + 2}`,
  topics: [skill],
  status: index === 0 ? "in-progress" : "locked"
}));

    await user.save();

    /* ===== RESPONSE ===== */

    res.json({
      career: goal,
      domain,
      skillsHave: userSkills,
      skillsMissing,
      skillsImprove,
      roadmap,
      progress:
        requiredSkills.length > 0
          ? Math.round(
              (matchedSkills.length /
                requiredSkills.length) *
                100
            )
          : 0
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});