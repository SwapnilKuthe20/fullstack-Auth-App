const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, login, refreshToken } = require('../Controllers/AuthController');

const router = require('express').Router();

router.post('/login', loginValidation, login)

router.post('/signup', signupValidation, signup)

router.post('/refreshToken', refreshToken);


module.exports = router;