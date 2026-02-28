import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 UPDATE USER SKILLS
router.put("/skills", authMiddleware, async (req, res) => {
  try {
    const { skills } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.skills = skills;
    await user.save();

    res.json({ message: "Skills updated successfully" });

  } catch (err) {
    console.error("Update Skills Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;