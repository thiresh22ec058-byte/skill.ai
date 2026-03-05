import express from "express";
import Career from "../models/Career.js";

const router = express.Router();

/* ================= DASHBOARD DATA ================= */

router.get("/", async (req, res) => {
  try {

    const careers = await Career.find();

    /* ================= TRENDING CAREERS ================= */

    const trending = careers
      .filter(c => c.demandLevel === "high")
      .slice(0, 5);

    /* ================= HIGHEST SALARY ================= */

    const highestSalary = careers
      .sort((a, b) => {
        const aSalary = a.salaries?.[0]?.max || 0;
        const bSalary = b.salaries?.[0]?.max || 0;
        return bSalary - aSalary;
      })
      .slice(0, 5);

    res.json({
      trending,
      highestSalary
    });

  } catch (error) {

    console.error("Dashboard Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

export default router;