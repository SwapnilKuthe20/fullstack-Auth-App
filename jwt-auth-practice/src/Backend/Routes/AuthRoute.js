const express = require('express')
const { signup, login } = require('../Controllers/AuthController')
const { signupValidation, loginValidation } = require('../MiddleWares/AuthMiddleware')
const authRoute = express.Router()


authRoute.post('/signup', signupValidation, signup)

authRoute.post('/login', loginValidation, login)

module.exports = { authRoute }