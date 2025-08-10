const express = require('express');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/authMiddleware');
const { signupController, loginController, generateTokenController, logoutController, googleLoginController } = require('../Controllers/authController');
const authRouter = express.Router();

authRouter.post('/signup', signupMiddleware, signupController)

authRouter.post('/login', loginMiddleware, loginController)

authRouter.post('/generateToken', generateTokenController)

authRouter.post('/logout', logoutController)

authRouter.post('/google/callback', googleLoginController)
// frontend will POST { credential } to /api/auth/google/callback

module.exports = { authRouter }