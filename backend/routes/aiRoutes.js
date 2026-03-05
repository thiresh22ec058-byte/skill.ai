import express from "express";

console.log("AI ROUTES LOADED");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "AI route working" });
});

export default router;