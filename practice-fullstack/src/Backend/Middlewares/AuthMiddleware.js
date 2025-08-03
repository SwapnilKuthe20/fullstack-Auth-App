const joi = require('joi')

const signupMiddleware = (req, res, next) => {

    const Schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    })

    const { error } = Schema.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message, success: false })
    }

    next()      // next middleware ko call karta hai
}

const loginMiddleware = (req, res, next) => {

    const Schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(15).required()
    })

    const { error } = Schema.validate(req.body);

    // console.log(error, "...Loginmiddleware");

    if (error) {
        return res.status(400).json({ error: error.details[0].message, success: false })
    }

    next()
}

module.exports = {
    signupMiddleware,
    loginMiddleware
}