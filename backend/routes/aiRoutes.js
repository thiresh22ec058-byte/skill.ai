import express from "express";
import { analyzeCareer } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze-career", analyzeCareer);

export default router;