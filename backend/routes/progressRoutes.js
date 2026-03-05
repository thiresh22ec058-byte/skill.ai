import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

router.post("/update", async (req, res) => {
  try {
    const { userId, career, phase, status } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId, career, phase },
      { status },
      { new: true, upsert: true }
    );

    res.json(progress);

  } catch (error) {
    console.error("Progress update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;