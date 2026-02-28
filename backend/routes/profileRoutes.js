import express from "express";
import User from "../models/User.js";
import PlaylistCache from "../models/PlaylistCache.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "-" + file.originalname
    );
  }
});

const upload = multer({ storage });

/* ================= GET PROFILE ================= */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      name: user.name || "",
      role: user.role || "",
      profilePhoto: user.profilePhoto || "",
      careerGoal: user.careerGoal || "",
      roadmapProgress: user.roadmapProgress || [],
      projects: user.projects || [],
      stats: {
        progressPercent: 0,
        jobReadinessPercent: 0
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= UPDATE WEEK ================= */
router.put("/update-week", authMiddleware, async (req, res) => {
  try {
    const { weekIndex } = req.body;

    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (
      weekIndex === undefined ||
      !user.roadmapProgress[weekIndex]
    ) {
      return res.status(400).json({ message: "Invalid week index" });
    }

    // Mark current week complete
    user.roadmapProgress[weekIndex].status = "completed";

    // Unlock next week
    if (user.roadmapProgress[weekIndex + 1]) {
      user.roadmapProgress[weekIndex + 1].status = "in-progress";
    }

    user.markModified("roadmapProgress"); // 🔥 IMPORTANT FIX

    await user.save();

    res.json({ message: "Week updated successfully" });

  } catch (err) {
    console.error("Update Week Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= UPDATE PROFILE ================= */
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, role, profilePhoto } = req.body;

    const user = await User.findById(req.user.id);

    user.name = name;
    user.role = role;
    user.profilePhoto = profilePhoto;

    await user.save();

    res.json({ message: "Profile updated" });

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= ADD PROJECT ================= */
router.post(
  "/add-project",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    try {
      const { title, type, link } = req.body;

      const user = await User.findById(req.user.id);

      user.projects.push({
        title,
        type,
        link,
        file: req.file ? `/uploads/${req.file.filename}` : ""
      });

      await user.save();

      res.json({ message: "Project added" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
  }
);

/* ================= DELETE PROJECT ================= */
router.delete("/delete-project/:index", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.projects.splice(req.params.index, 1);
    await user.save();

    res.json({ message: "Project deleted" });

  } catch {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;