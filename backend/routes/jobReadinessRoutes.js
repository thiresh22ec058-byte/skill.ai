import express from "express";
import Career from "../models/Career.js";

const router = express.Router();

/* ================= JOB READINESS ENGINE ================= */

router.post("/", async (req, res) => {
  try {

    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({
        message: "Skills required"
      });
    }

    const userSkills = skills.map(s => s.toLowerCase());

    const careers = await Career.find();

    const readinessResults = careers.map(career => {

      const required = career.requiredSkills.map(s => s.toLowerCase());

      const matched = required.filter(skill =>
        userSkills.includes(skill)
      );

      const readinessScore =
        Math.round((matched.length / required.length) * 100);

      return {
        career: career.title,
        readiness: readinessScore,
        matchedSkills: matched,
        missingSkills: required.filter(
          skill => !userSkills.includes(skill)
        )
      };

    });

    const sorted = readinessResults
      .sort((a, b) => b.readiness - a.readiness)
      .slice(0, 5);

    res.json(sorted);

  } catch (error) {

    console.error("Job Readiness Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

export default router;