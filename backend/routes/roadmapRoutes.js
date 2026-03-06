import express from "express";
import User from "../models/User.js";
import Career from "../models/Career.js";
import { protect } from "../middleware/authMiddleware.js";
import { generateRoadmap } from "../services/roadmapService.js";

const router = express.Router();

/* ================= GET ROADMAP ================= */

router.post("/", protect, async (req, res) => {

  try {

    const { goal } = req.body;

    const user = await User.findById(req.user.id);

    const userSkills = user.skills || [];

    const roadmap = generateRoadmap(goal, userSkills);

    /* Initialize roadmap progress ONLY if not exists */

    if (!user.roadmapProgress || user.roadmapProgress.goal !== goal) {

      user.roadmapProgress = {
        goal,
        completedPhases: [],
        currentPhase: 1
      };

      await user.save();
    }

    const completed = user.roadmapProgress.completedPhases || [];

    const current = user.roadmapProgress.currentPhase || 1;

    const phases = roadmap.phases.map((phase) => {

      let status = "locked";

      if (completed.includes(phase.phase)) {
        status = "completed";
      }
      else if (phase.phase === current) {
        status = "unlocked";
      }

      return {
        ...phase,
        status
      };

    });

    res.json({
      goal,
      title: roadmap.title,
      phases
    });

  } catch (error) {

    console.error("Roadmap Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* ================= COMPLETE PHASE ================= */

router.post("/complete-phase", protect, async (req, res) => {

  try {

    const { goal, phaseNumber } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.roadmapProgress || user.roadmapProgress.goal !== goal) {

      user.roadmapProgress = {
        goal,
        completedPhases: [],
        currentPhase: 1
      };

    }

    if (!user.roadmapProgress.completedPhases.includes(phaseNumber)) {
      user.roadmapProgress.completedPhases.push(phaseNumber);
    }

    user.roadmapProgress.currentPhase = phaseNumber + 1;

    await user.save();

    res.json({
      message: "Phase completed successfully"
    });

  } catch (error) {

    console.error("Complete Phase Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* ================= USER PROGRESS ================= */

router.get("/user-progress", protect, async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    if (!user || !user.roadmapProgress) {

      return res.status(404).json({
        message: "No roadmap progress found"
      });

    }

    const goal = user.roadmapProgress.goal;

    const completed = user.roadmapProgress.completedPhases || [];

    const totalPhases = 3;

    const progressPercent =
      Math.round((completed.length / totalPhases) * 100);

    res.json({
      goal,
      completedPhases: completed,
      currentPhase: user.roadmapProgress.currentPhase,
      progressPercent
    });

  } catch (error) {

    console.error("Progress Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

export default router;