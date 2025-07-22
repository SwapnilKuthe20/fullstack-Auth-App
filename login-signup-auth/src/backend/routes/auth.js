const express = require("express");
const router = express.Router();
const { signup, login, refresh, getMe } = require("../controllers/authController");
const authController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");


router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refresh);
router.get("/me", auth, authController.getMe);

module.exports = router;
