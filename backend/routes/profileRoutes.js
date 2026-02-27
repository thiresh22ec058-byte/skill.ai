import express from "express";
import User from "../models/User.js";
import PlaylistCache from "../models/PlaylistCache.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= GET PROFILE ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach playlist videos
    const cached = await PlaylistCache.findOne({
      goal: user.careerGoal
    });

    let roadmapWithVideos = [];

if (user.roadmapProgress?.length > 0) {
  roadmapWithVideos = user.roadmapProgress.map((week, index) => ({
    ...week,
    videos: cached?.roadmap?.[index]?.videos || []
  }));
}

    const totalWeeks = roadmapWithVideos.length;
    const completedWeeks = roadmapWithVideos.filter(
      w => w.status === "completed"
    ).length;

    const progressPercent =
      totalWeeks > 0
        ? Math.round((completedWeeks / totalWeeks) * 100)
        : 0;

    const totalProjects = user.projects?.length || 0;
    const completedProjects =
      user.projects?.filter(p => p.completed).length || 0;

    const jobReadinessPercent = Math.min(
      100,
      Math.round(
        progressPercent * 0.7 +
        (totalProjects > 0
          ? (completedProjects / totalProjects) * 30
          : 0)
      )
    );

    res.json({
      id: user._id,
      name: user.name,
      stream: user.stream,
      year: user.year,
      careerGoal: user.careerGoal,
      roadmap: roadmapWithVideos,
      projects: user.projects || [],
      stats: {
        progressPercent,
        completedWeeks,
        totalWeeks,
        completedProjects,
        totalProjects,
        jobReadinessPercent
      }
    });

  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= UPDATE WEEK ================= */
router.put("/update-week", authMiddleware, async (req, res) => {
  try {
    const { weekIndex } = req.body;

    const user = await User.findById(req.user.id);

    if (!user || !user.roadmapProgress) {
      return res.status(404).json({ message: "User not found" });
    }

    user.roadmapProgress[weekIndex].status = "completed";

    if (user.roadmapProgress[weekIndex + 1]) {
      user.roadmapProgress[weekIndex + 1].status = "in-progress";
    }

    await user.save();

    res.json({ message: "Week updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= ADD PROJECT ================= */
router.post("/add-project", authMiddleware, async (req, res) => {
  try {
    const { title, link } = req.body;

    const user = await User.findById(req.user.id);

    user.projects.push({
      title,
      link,
      completed: false
    });

    await user.save();

    res.json(user.projects);

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;