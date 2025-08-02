const express = require('express');
const { signup, login, refreshToken } = require('../Controllers/AuthController');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/AuthMiddleware');
const router = express.Router();


router.post('/signup', signupMiddleware, signup)
router.post('/login', loginMiddleware, login)
router.post('/refreshToken', refreshToken)

module.exports = router 