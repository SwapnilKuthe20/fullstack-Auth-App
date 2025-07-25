const express = require('express');
const { signup, login } = require('../Controllers/AuthController');
const Routes = express.Router();

Routes.post('/signup', signup)

Routes.post('/login', login)

module.exports = Routes;