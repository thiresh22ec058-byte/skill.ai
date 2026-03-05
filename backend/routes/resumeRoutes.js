import express from "express";
import multer from "multer";
import fs from "fs";
import { PdfReader } from "pdfreader";
import Career from "../models/Career.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/"
});

router.post("/analyze", upload.single("resume"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Resume not uploaded"
      });
    }

    const filePath = req.file.path;

    let text = "";

    await new Promise((resolve, reject) => {

      new PdfReader().parseFileItems(filePath, (err, item) => {

        if (err) reject(err);

        else if (!item) resolve();

        else if (item.text) {
          text += item.text + " ";
        }

      });

    });

    text = text.toLowerCase();

    const skillList = [
      "python",
      "machine learning",
      "data science",
      "javascript",
      "react",
      "node",
      "html",
      "css",
      "mongodb"
    ];

    const detectedSkills = skillList.filter(skill =>
      text.includes(skill)
    );

    const careers = await Career.find();

    const matchedCareers = careers.filter(career =>
      career.requiredSkills.some(skill =>
        detectedSkills.includes(skill.toLowerCase())
      )
    );

    res.json({
      detectedSkills,
      matchedCareers
    });

  } catch (error) {

    console.error("Resume Analyzer Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

export default router;