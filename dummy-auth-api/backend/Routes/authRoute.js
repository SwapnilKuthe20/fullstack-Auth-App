const express = require('express');
const authRoute = express.Router();

const { signupController, loginController, refreshToken } = require('../Controllers/authController');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/authMiddleware');

authRoute.post('/signup', signupMiddleware, signupController)
authRoute.post('/login', loginMiddleware, loginController)
authRoute.post('/refreshToken', refreshToken)


module.exports = { authRoute }