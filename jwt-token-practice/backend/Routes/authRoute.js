const express = require('express');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/authMiddleware');
const { signupController, loginController, generateTokenController, logoutController } = require('../Controllers/authController');
const authRouter = express.Router();

authRouter.post('/signup', signupMiddleware, signupController)

authRouter.post('/login', loginMiddleware, loginController)

authRouter.post('/generateToken', generateTokenController)

authRouter.post('/logout', logoutController)

module.exports = { authRouter }