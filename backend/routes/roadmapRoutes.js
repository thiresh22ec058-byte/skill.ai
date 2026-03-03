import express from "express";
import { generateRoadmapFromGPT } from "../services/roadmapService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { goal, skillLevel, currentSkills, dailyHours } = req.body;

    const roadmap = await generateRoadmapFromGPT({
      goal,
      skillLevel,
      currentSkills,
      dailyHours,
    });

    res.json({
      success: true,
      roadmap,
    });

  } catch (error) {
    console.error("Roadmap Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;