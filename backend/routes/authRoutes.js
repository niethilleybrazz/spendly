const express = require("express");
const {protect} = require("../middleware/authMiddleware.js")
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserInfo,
} = require("../controllers/authController.js")

router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/getUser", protect, getUserInfo)

module.exports = router