import express from "express";
import Career from "../models/Career.js";

const router = express.Router();

/* ================= RECOMMEND CAREERS ================= */

router.post("/", async (req, res) => {

  try {

    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({
        message: "Skills required"
      });
    }

    const careers = await Career.find();

    const userSkills = skills.map(s => s.toLowerCase());

    const scoredCareers = careers.map(career => {

      const required = career.requiredSkills.map(s => s.toLowerCase());

      const matched = required.filter(skill =>
        userSkills.includes(skill)
      );

      const score = matched.length;

      return {
        career,
        score
      };

    });

    const sorted = scoredCareers
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(item => item.career);

    res.json(sorted);

  } catch (error) {

    console.error("Recommendation Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

export default router;