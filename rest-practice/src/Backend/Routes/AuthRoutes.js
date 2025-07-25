const express = require('express');
const { signup, login } = require('../Controllers/AuthController');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/AuthMiddleware');
const Routes = express.Router();

Routes.post('/signup', signupMiddleware, signup)

Routes.post('/login', loginMiddleware, login)

module.exports = Routes;