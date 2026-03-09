import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { domainJobs } from "../config/domainJobs.js";
import { normalizeGoal } from "../config/careerDomains.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    const goal = normalizeGoal(user.careerGoal);

    const roadmap = user.roadmapProgress || {};
    const completed = roadmap.completedPhases || [];

    const totalPhases = 3;

    const readiness = Math.round(
      (completed.length / totalPhases) * 100
    );

    const jobs = domainJobs[goal] || [];

    res.json({
      readiness,
      jobs
    });

  } catch (error) {

    console.error("Job Recommend Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

export default router;