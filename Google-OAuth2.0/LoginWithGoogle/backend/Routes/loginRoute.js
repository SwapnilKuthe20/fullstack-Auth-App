const loginController = require('../Controllers/loginController')
const route = require('express').Router()


route.post('/google/callback', loginController)

module.exports = route