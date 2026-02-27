import express from "express";
import controller from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/profile", authMiddleware, controller.getProfile);
router.put("/skills", authMiddleware, controller.updateSkills);

export default router;