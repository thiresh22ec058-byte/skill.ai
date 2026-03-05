import express from "express";
import Career from "../models/Career.js";

const router = express.Router();

/* ================= TRENDING CAREERS ================= */

router.get("/trending", async (req, res) => {

  try {

    const careers = await Career.find({
      demandLevel: "high"
    }).limit(6);

    res.json(careers);

  } catch (error) {

    console.error("Trending Careers Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* ================= HIGH SALARY CAREERS ================= */

router.get("/high-salary", async (req, res) => {

  try {

    const careers = await Career.find({
      demandLevel: "high"
    });

    const sorted = careers.sort((a, b) => {

      const aSalary = a.salaries?.[0]?.max || 0;
      const bSalary = b.salaries?.[0]?.max || 0;

      return bSalary - aSalary;

    });

    res.json(sorted.slice(0, 6));

  } catch (error) {

    console.error("Salary Careers Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* ================= ALL CAREERS ================= */

router.get("/all", async (req, res) => {

  try {

    const careers = await Career.find();

    res.json(careers);

  } catch (error) {

    console.error("All Careers Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

export default router;