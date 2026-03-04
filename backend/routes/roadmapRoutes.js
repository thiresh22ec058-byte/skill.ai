import express from "express";
import User from "../models/User.js";
import Career from "../models/Career.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= GET ROADMAP ================= */

router.post("/", protect, async (req, res) => {

  try {

    const { goal } = req.body;
    const userId = req.user.id;

    const career = await Career.findOne({ title: goal });

    if (!career) {
      return res.status(404).json({
        message: "Career roadmap not found"
      });
    }

    const roadmap = career.roadmap;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    /* Initialize roadmap progress */

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

    const phases = roadmap.map((phase) => {

      let status = "locked";

      if (completed.includes(phase.phase)) {
        status = "completed";
      }
      else if (phase.phase === current) {
        status = "unlocked";
      }

      return {
        ...phase._doc,
        status
      };

    });

    res.json({
      goal: career.title,
      title: career.title,
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
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user || !user.roadmapProgress) {
      return res.status(400).json({
        message: "Roadmap not initialized"
      });
    }

    const completed = user.roadmapProgress.completedPhases;

    if (!completed.includes(phaseNumber)) {
      completed.push(phaseNumber);
    }

    user.roadmapProgress.currentPhase = phaseNumber + 1;

    const career = await Career.findOne({ title: goal });

    const totalPhases = career.roadmap.length;

    const progressPercent =
      Math.round((completed.length / totalPhases) * 100);

    await user.save();

    res.json({
      message: "Phase completed successfully",
      progress: {
        goal,
        completedPhases: completed,
        currentPhase: user.roadmapProgress.currentPhase,
        progressPercent
      }
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

    const career = await Career.findOne({ title: goal });

    const totalPhases = career.roadmap.length;

    const completed = user.roadmapProgress.completedPhases;

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