import express from "express";
import axios from "axios";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { normalizeGoal } from "../config/careerDomains.js";
import { careerSearchMap } from "../config/careerSearchMap.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {

  try {

    /* ================= CITY FILTER ================= */

    const selectedCities = req.query.city
      ? req.query.city.split(",")
      : [];

    const allCities = [
      "Bangalore",
      "Hyderabad",
      "Pune",
      "Delhi",
      "Mumbai",
      "Chennai"
    ];

    const cities =
      selectedCities.length === 0 ? allCities : selectedCities;

    /* ================= USER ================= */

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    /* ================= NORMALIZE GOAL ================= */

    const goal = normalizeGoal(user.careerGoal);

    let searchKeywords = careerSearchMap[goal] || ["manager"];

    if (!Array.isArray(searchKeywords)) {
      searchKeywords = [searchKeywords];
    }

    /* ================= READINESS ================= */

    const roadmap = user.roadmapProgress || {};
    const completed = roadmap.completedPhases || [];

    const readiness = Math.round((completed.length / 3) * 100);

    /* ================= FETCH JOBS ================= */

    let allJobs = [];

    for (const keyword of searchKeywords) {

      for (const city of cities) {

        const response = await axios.get(
          "https://api.adzuna.com/v1/api/jobs/in/search/1",
          {
            params: {
              app_id: process.env.ADZUNA_APP_ID,
              app_key: process.env.ADZUNA_APP_KEY,
              what: keyword,
              where: city,
              results_per_page: 5
            }
          }
        );

        console.log(
          `Adzuna results for ${keyword} in ${city}:`,
          response.data.results.length
        );

        const jobs = (response.data.results || []).map(job => ({
          title: job.title,
          company: job.company?.display_name || "Unknown Company",
          location: job.location?.display_name || city,
          redirect: job.redirect_url
        }));

        allJobs.push(...jobs);

      }

    }

    /* ================= REMOVE DUPLICATES ================= */

    const uniqueJobs = [];
    const seen = new Set();

    for (const job of allJobs) {

      if (!seen.has(job.redirect)) {

        seen.add(job.redirect);
        uniqueJobs.push(job);

      }

    }

    /* ================= RESPONSE ================= */

    res.json({
      readiness,
      jobs: uniqueJobs.slice(0, 30)
    });

  } catch (error) {

    console.error(
      "Job Recommend Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Server Error"
    });

  }

});

export default router;