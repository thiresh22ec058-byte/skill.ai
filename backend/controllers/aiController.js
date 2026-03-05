import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import { extractSkills } from "../services/resumeAnalyzer.js";
import { matchCareers } from "../services/careerMatcher.js";
import { findSkillGap } from "../services/skillGapAnalyzer.js";

/* ================= TEXT INPUT ANALYSIS ================= */

export async function analyzeCareer(req, res) {
  try {

    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        message: "resumeText is required"
      });
    }

    const detectedSkills = extractSkills(resumeText);

    const matchedCareers = await matchCareers(detectedSkills);

    const bestCareer = matchedCareers[0];

    let confidence = "Low";

if (bestCareer.score >= 70) {
  confidence = "High";
} else if (bestCareer.score >= 40) {
  confidence = "Medium";
}

    const skillGaps = findSkillGap(detectedSkills, bestCareer);

    /* SKILL GRAPH GENERATION */

    const skillGraph = bestCareer.requiredSkills.map(skill => ({
      skill,
      status: detectedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        ? "known"
        : "missing"
    }));

    res.json({
  detectedSkills,
  bestCareer,
  confidence,
  skillGaps,
  roadmap: bestCareer?.roadmap || [],
  skillGraph
});

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Career analysis failed"
    });

  }
}


/* ================= PDF RESUME ANALYSIS ================= */

export async function analyzeCareerFromPDF(req, res) {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No resume file uploaded"
      });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    const resumeText = pdfData.text;

    const detectedSkills = extractSkills(resumeText);

    const matchedCareers = await matchCareers(detectedSkills);

    const bestCareer = matchedCareers[0];

    const skillGaps = findSkillGap(detectedSkills, bestCareer);

    /* SKILL GRAPH GENERATION */

    const skillGraph = bestCareer.requiredSkills.map(skill => ({
      skill,
      status: detectedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        ? "known"
        : "missing"
    }));

    res.json({
      detectedSkills,
      bestCareer,
      skillGaps,
      roadmap: bestCareer?.roadmap || [],
      skillGraph
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Resume analysis failed"
    });

  }

}