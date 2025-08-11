const { googleController } = require("../Controllers/googleController")
const googleRoute = require("express").Router()

googleRoute.post('/google/callback', googleController)

module.exports = { googleRoute }