const express = require('express');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/authMiddleware');
const { signupController, loginController, generateTokenController } = require('../Controllers/authController');
const authRouter = express.Router();

authRouter.post('/signup', signupMiddleware, signupController)

authRouter.post('/login', loginMiddleware, loginController)

authRouter.post('/generateToken', generateTokenController)

module.exports = { authRouter }