import express from "express";
import multer from "multer";
import { analyzeCareer, analyzeCareerFromPDF } from "../controllers/aiController.js";

console.log("AI ROUTES LOADED");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/test", (req, res) => {
  res.json({ message: "AI route working" });
});

router.post("/analyze-career", analyzeCareer);

router.post("/analyze-resume", upload.single("resume"), analyzeCareerFromPDF);

export default router;