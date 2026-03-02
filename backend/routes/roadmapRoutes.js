// backend/routes/roadmapRoutes.js

import express from "express";
import RoadmapCache from "../models/RoadmapCache.js";
import { generateRoadmapFromGPT } from "../services/roadmapService.js";

const router = express.Router();

router.post("/generate-roadmap", async (req, res) => {
  try {
    const { goal, skillLevel, currentSkills, dailyHours } = req.body;

    if (!goal || !skillLevel || !dailyHours) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 1️⃣ Check cache
    const cachedRoadmap = await RoadmapCache.findOne({
      goal,
      skillLevel,
      dailyHours,
    });

    if (cachedRoadmap) {
      return res.json({
        source: "cache",
        roadmap: cachedRoadmap.roadmapData,
      });
    }

    // 2️⃣ Generate using GPT
    const roadmap = await generateRoadmapFromGPT({
      goal,
      skillLevel,
      currentSkills: currentSkills || [],
      dailyHours,
    });

    // 3️⃣ Save to DB
    await RoadmapCache.create({
      goal,
      skillLevel,
      dailyHours,
      currentSkills,
      roadmapData: roadmap,
    });

    res.json({
      source: "ai",
      roadmap,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;