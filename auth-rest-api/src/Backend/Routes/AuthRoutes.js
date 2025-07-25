const express = require('express');
const { signupMiddleware, loginMiddleware } = require('../Middlewares/AuthMiddleware');
const { signupController, loginController } = require("../Controllers/AuthController")
const Routes = express.Router();

Routes.post('/signup', signupMiddleware, signupController)

Routes.post('/login', loginMiddleware, loginController)

module.exports = Routes;