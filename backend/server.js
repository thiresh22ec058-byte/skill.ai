console.log("THIS SERVER FILE IS EXECUTING");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

/* ================= IMPORT MODELS ================= */

import User from "./models/User.js";

/* ================= IMPORT CONFIG ================= */

import { normalizeGoal, domainSkills } from "./config/careerDomains.js";

/* ================= IMPORT ROUTES ================= */

import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import skillGapRoutes from "./routes/skillGapRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import explorerRoutes from "./routes/explorerRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import jobReadinessRoutes from "./routes/jobReadinessRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

console.log("AI ROUTES IMPORTED");

/* ================= ENV ================= */

dotenv.config();

/* ================= APP ================= */

const app = express();

/* ================= PATH FIX ================= */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());

/* ================= STATIC FILES ================= */

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= DATABASE ================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

/* ================= ROUTES ================= */

app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/skill-gap", skillGapRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/explorer", explorerRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/job-readiness", jobReadinessRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ai", aiRoutes);

/* ================= TEST ROUTE ================= */

app.get("/test-server", (req, res) => {
  res.send("Server working");
});

/* ================= JOBS API ================= */

app.get("/api/jobs", (req, res) => {
  try {

    const readiness = Number(req.query.readiness);
    const domain = req.query.domain || "Professional";

    let jobs = [];

    if (readiness < 40) {

      jobs = [
        `${domain} Intern`,
        `Junior ${domain} Associate`,
        `${domain} Trainee`
      ];

    } else if (readiness < 70) {

      jobs = [
        `${domain} Analyst`,
        `${domain} Executive`,
        `${domain} Consultant`
      ];

    } else {

      jobs = [
        `Senior ${domain} Developer`,
        `${domain} Manager`,
        `${domain} Team Lead`,
        `${domain} Specialist`
      ];

    }

    res.json(jobs);

  } catch (error) {

    console.error("Jobs API Error:", error);

    res.status(500).json({ message: "Server Error" });

  }
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);