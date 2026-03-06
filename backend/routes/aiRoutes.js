import express from "express";
import multer from "multer";
import {
  analyzeCareer,
  analyzeCareerFromPDF
} from "../controllers/aiController.js";

const router = express.Router();

/* ================= FILE UPLOAD ================= */

const upload = multer({
  dest: "uploads/"
});

/* ================= TEST ROUTE ================= */

router.get("/test", (req, res) => {
  res.json({
    message: "AI route working"
  });
});

/* ================= CAREER ANALYSIS ================= */

router.post(
  "/analyze-career",
  analyzeCareer
);

/* ================= RESUME ANALYSIS ================= */

router.post(
  "/analyze-resume",
  upload.single("resume"),
  analyzeCareerFromPDF
);

export default router;