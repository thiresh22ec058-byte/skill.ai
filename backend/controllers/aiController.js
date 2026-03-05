import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

import { extractSkills } from "../services/resumeAnalyzer.js";
import { matchCareers } from "../services/careerMatcher.js";
import { findSkillGap } from "../services/skillGapAnalyzer.js";

/* TEXT INPUT ANALYSIS */

export async function analyzeCareer(req, res) {
  try {

    const { resumeText } = req.body;

    const detectedSkills = extractSkills(resumeText);

    const matchedCareers = await matchCareers(detectedSkills);

    const bestCareer = matchedCareers[0];

    const skillGaps = findSkillGap(detectedSkills, bestCareer);

    res.json({
      detectedSkills,
      bestCareer,
      skillGaps,
      roadmap: bestCareer?.roadmap || []
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Career analysis failed"
    });

  }
}

/* PDF RESUME ANALYSIS */

export async function analyzeCareerFromPDF(req, res) {

  try {

    const pdfBuffer = fs.readFileSync(req.file.path);

    const pdfData = await pdfParse(pdfBuffer);

    const resumeText = pdfData.text;

    const detectedSkills = extractSkills(resumeText);

    const matchedCareers = await matchCareers(detectedSkills);

    const bestCareer = matchedCareers[0];

    const skillGaps = findSkillGap(detectedSkills, bestCareer);

    res.json({
      detectedSkills,
      bestCareer,
      skillGaps,
      roadmap: bestCareer?.roadmap || []
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Resume analysis failed"
    });

  }

}