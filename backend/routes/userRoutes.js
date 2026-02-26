const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/profile", authMiddleware, controller.getProfile);
router.put("/skills", authMiddleware, controller.updateSkills);

module.exports = router;