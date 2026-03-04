import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

/* ================= MULTER SETUP ================= */

// Ensure uploads folder exists
const uploadPath = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB
  }
});

/* ================= GET PROFILE ================= */

router.get("/", protect, async (req, res) => {
  try {

    const user = await User.findById(req.user.id).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const totalWeeks = user.roadmapProgress?.length || 0;

    const completedWeeks =
      user.roadmapProgress?.filter(
        (w) => w.status === "completed"
      ).length || 0;

    const progressPercent =
      totalWeeks > 0
        ? Math.round((completedWeeks / totalWeeks) * 100)
        : 0;

    res.json({
      id: user._id,
      name: user.name || "",
      role: user.role || "",
      profilePhoto: user.profilePhoto || "",
      careerGoal: user.careerGoal || "",
      roadmapProgress: user.roadmapProgress || [],
      projects: user.projects || [],
      stats: {
        progressPercent
      }
    });

  } catch (err) {

    console.error("Profile Fetch Error:", err);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

/* ================= UPDATE PROFILE ================= */

router.put("/update-profile", protect, async (req, res) => {
  try {

    const { name, role, profilePhoto } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.name = name || user.name;
    user.role = role || user.role;
    user.profilePhoto = profilePhoto || user.profilePhoto;

    await user.save();

    res.json({
      message: "Profile updated successfully"
    });

  } catch (error) {

    console.error("Update Profile Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

/* ================= UPDATE WEEK ================= */

router.put("/update-week", protect, async (req, res) => {
  try {

    const { weekIndex } = req.body;

    const user = await User.findById(req.user.id);

    if (
      !user ||
      weekIndex === undefined ||
      !user.roadmapProgress ||
      !user.roadmapProgress[weekIndex]
    ) {
      return res.status(400).json({
        message: "Invalid week index"
      });
    }

    user.roadmapProgress[weekIndex].status = "completed";

    if (user.roadmapProgress[weekIndex + 1]) {
      user.roadmapProgress[weekIndex + 1].status = "in-progress";
    }

    await user.save();

    res.json({
      message: "Week updated successfully"
    });

  } catch (error) {

    console.error("Update Week Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

/* ================= ADD PROJECT ================= */

router.post(
  "/add-project",
  protect,
  upload.single("file"),
  async (req, res) => {
    try {

      const { title, type, link } = req.body;

      if (!title || !type) {
        return res.status(400).json({
          message: "Missing fields"
        });
      }

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      if (type === "hardware" && !req.file) {
        return res.status(400).json({
          message: "Hardware project requires a file"
        });
      }

      if (type === "software" && !link) {
        return res.status(400).json({
          message: "Software project requires a link"
        });
      }

      const newProject = {
        title,
        type,
        link: type === "software" ? link : "",
        file: req.file ? `/uploads/${req.file.filename}` : ""
      };

      user.projects.push(newProject);

      await user.save();

      res.json({
        message: "Project added successfully"
      });

    } catch (err) {

      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File size must be under 100MB"
        });
      }

      console.error("Add Project Error:", err);

      res.status(500).json({
        message: "Server Error"
      });

    }
  }
);

/* ================= DELETE PROJECT ================= */

router.delete("/delete-project/:index", protect, async (req, res) => {
  try {

    const index = parseInt(req.params.index);

    const user = await User.findById(req.user.id);

    if (
      !user ||
      isNaN(index) ||
      index < 0 ||
      index >= user.projects.length
    ) {
      return res.status(400).json({
        message: "Invalid index"
      });
    }

    user.projects.splice(index, 1);

    await user.save();

    res.json({
      message: "Project deleted successfully"
    });

  } catch (error) {

    console.error("Delete Project Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

export default router;