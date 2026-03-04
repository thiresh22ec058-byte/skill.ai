import express from "express";
import { domainSkills, skillSynonyms, normalizeGoal } from "../config/careerDomains.js";

console.log("Skill Gap Route Loaded");
const router = express.Router();

router.post("/", (req, res) => {

  try {

    const { goal, userSkills } = req.body;

    if (!goal) {
      return res.status(400).json({ message: "Goal is required" });
    }

    const normalizedGoal = normalizeGoal(goal);

    const requiredSkills = domainSkills[normalizedGoal] || [];

    const userSkillsLower = (userSkills || []).map(s => s.toLowerCase());

    const matchedSkills = [];
    const missingSkills = [];

    for (const skill of requiredSkills) {

      const skillLower = skill.toLowerCase();

      const synonyms = skillSynonyms[skill] || [];

      const allVariants = [
        skillLower,
        ...synonyms.map(s => s.toLowerCase())
      ];

      const hasSkill = userSkillsLower.some(userSkill =>
        allVariants.includes(userSkill)
      );

      if (hasSkill) {
        matchedSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }

    }

    const score =
      requiredSkills.length === 0
        ? 0
        : Math.round((matchedSkills.length / requiredSkills.length) * 100);

    res.json({
      goal: normalizedGoal,
      matchedSkills,
      missingSkills,
      readinessScore: score
    });

  } catch (error) {

    console.error("Skill Gap Error:", error);

    res.status(500).json({ message: "Server Error" });

  }

});

export default router;