import {
  normalizeGoal,
  domainSkills,
  skillSynonyms
} from "../config/careerDomains.js";

export const analyzeCareer = async (req, res) => {

  try {

    const { resumeText, goal } = req.body;

    if (!resumeText || !goal) {
      return res.status(400).json({
        message: "Missing resumeText or goal"
      });
    }

    // Normalize goal
    const normalizedGoal = normalizeGoal(goal);

    const requiredSkills =
      domainSkills[normalizedGoal] || [];

    // Convert resume text to skill array
    let userSkills = resumeText
      .toLowerCase()
      .split(/[,\s]+/)
      .map(skill => skill.trim())
      .filter(Boolean);

    // Normalize skills using synonyms
    const normalizedSkills = new Set(userSkills);

    for (const mainSkill in skillSynonyms) {

      const synonyms = skillSynonyms[mainSkill];

      if (synonyms.some(s =>
        userSkills.includes(s.toLowerCase())
      )) {
        normalizedSkills.add(mainSkill.toLowerCase());
      }

    }

    userSkills = Array.from(normalizedSkills);

    // Expand synonyms
    const expandedSkills = new Set(userSkills);

    for (const mainSkill in skillSynonyms) {

      const synonyms = skillSynonyms[mainSkill];

      if (synonyms.some(s =>
        userSkills.includes(s.toLowerCase())
      )) {
        expandedSkills.add(mainSkill.toLowerCase());
      }

    }

    // Match skills
    const matchedSkills = requiredSkills.filter(skill =>
      userSkills.some(userSkill =>
        userSkill.includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill)
      )
    );

    // Missing skills
    const missingSkills = requiredSkills.filter(skill =>
      !matchedSkills.includes(skill)
    );

    // Readiness score
    let readinessScore = 0;

    if (requiredSkills.length > 0) {
      readinessScore = Math.round(
        (matchedSkills.length / requiredSkills.length) * 100
      );
    }

    res.json({
      goal: normalizedGoal,
      skillsYouHave: matchedSkills,
      missingSkills,
      readinessScore
    });

  } catch (error) {

    console.error(
      "Analyze Career Error:",
      error
    );

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export const analyzeCareerFromPDF = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No resume file uploaded"
      });
    }

    res.json({
      message: "Resume uploaded successfully",
      filename: req.file.filename
    });

  } catch (error) {

    console.error(
      "Resume Analyze Error:",
      error
    );

    res.status(500).json({
      message: "Server Error"
    });

  }

};