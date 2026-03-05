import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= GET PROFILE ================= */

router.get("/", protect, async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (error) {

    console.error("Profile Fetch Error:", error);

    res.status(500).json({ message: "Server Error" });

  }

});


/* ================= UPDATE PROFILE ================= */

router.put("/update-profile", protect, async (req, res) => {

  try {

    const { name, role, profilePhoto } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.role = role || user.role;
    user.profilePhoto = profilePhoto || user.profilePhoto;

    await user.save();

    res.json({ message: "Profile updated successfully" });

  } catch (error) {

    console.error("Update Profile Error:", error);

    res.status(500).json({ message: "Server Error" });

  }

});


/* ================= ADD PROJECT ================= */

router.post("/add-project", protect, async (req, res) => {

  try {

    const { title, link } = req.body;

    const user = await User.findById(req.user.id);

    if (!user.projects) user.projects = [];

    user.projects.push({
      title,
      link
    });

    await user.save();

    res.json({ message: "Project added successfully" });

  } catch (error) {

    console.error("Add Project Error:", error);

    res.status(500).json({ message: "Server Error" });

  }

});


/* ================= DELETE PROJECT ================= */

router.delete("/delete-project/:index", protect, async (req, res) => {

  try {

    const user = await User.findById(req.user.id);

    const index = req.params.index;

    user.projects.splice(index, 1);

    await user.save();

    res.json({ message: "Project deleted successfully" });

  } catch (error) {

    console.error("Delete Project Error:", error);

    res.status(500).json({ message: "Server Error" });

  }

});


export default router;