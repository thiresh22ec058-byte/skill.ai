import express from "express";
import Career from "../models/Career.js";

const router = express.Router();

/* ================= GET ALL CAREERS ================= */

router.get("/", async (req, res) => {
  try {

    const careers = await Career.find({}, "title domain demandLevel");

    res.json(careers);

  } catch (error) {

    console.error("Career Fetch Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});


/* ================= GET SINGLE CAREER ================= */

router.get("/:title", async (req, res) => {
  try {

    const career = await Career.findOne({
      title: req.params.title
    });

    if (!career) {
      return res.status(404).json({
        message: "Career not found"
      });
    }

    res.json(career);

  } catch (error) {

    console.error("Career Fetch Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});


/* ================= CREATE CAREER ================= */

router.post("/", async (req, res) => {
  try {

    const { title } = req.body;

    const existingCareer = await Career.findOne({ title });

    if (existingCareer) {
      return res.status(400).json({
        message: "Career already exists"
      });
    }

    const career = new Career(req.body);

    await career.save();

    res.json({
      message: "Career added successfully"
    });

  } catch (error) {

    console.error("Career Create Error:", error);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

export default router;