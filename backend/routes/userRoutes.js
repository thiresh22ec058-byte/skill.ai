import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      skills: []
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "User registered successfully",
      userId: user._id,
      token
    });

  } catch (err) {

    console.error("Register Error:", err);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      userId: user._id,
      token
    });

  } catch (err) {

    console.error("Login Error:", err);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

/* ================= UPDATE USER SKILLS ================= */
router.put("/skills", protect, async (req, res) => {
  try {

    const { skills } = req.body;

    /* Validate skills input */
    if (!Array.isArray(skills)) {
      return res.status(400).json({
        message: "Skills must be an array"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    /* Save skills */
    user.skills = skills;

    await user.save();

    res.json({
      message: "Skills updated successfully",
      skills: user.skills
    });

  } catch (err) {

    console.error("Update Skills Error:", err);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

/* ================= GET CURRENT USER ================= */
router.get("/me", protect, async (req, res) => {
  try {

    const user = await User
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    console.error("Get User Error:", err);

    res.status(500).json({
      message: "Server Error"
    });

  }
});

export default router;