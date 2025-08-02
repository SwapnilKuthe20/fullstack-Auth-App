const express = require('express');
const { signup, login } = require('../Controllers/AuthController');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/AuthMiddleware');
const router = express.Router();


router.post('/signup', signupMiddleware, signup)
router.post('/login', loginMiddleware, login)

module.exports = router