const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

console.log("registerUser:", controller.registerUser);
console.log("loginUser:", controller.loginUser);
console.log("getProfile:", controller.getProfile);
console.log("authMiddleware:", authMiddleware);

router.post("/register", controller.registerUser);
router.post("/login", controller.loginUser);
router.get("/profile", authMiddleware, controller.getProfile);

module.exports = router;