const Joi = require('joi')

const signupMiddleware = (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const Schema = Joi.object({
            userName: Joi.string().min(4).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(20).required(),
        })

        const { error } = Schema.validate({ userName, email, password })

        // console.log(error, "error schema signup validate");

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false })
        }

        next()

    } catch (error) {
        console.log(error, "Error in sign middle");
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

const loginMiddleware = (req, res, next) => {
    try {
        const { email, password } = req.body;

        const Schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(20).required(),
        })

        const { error } = Schema.validate({ email, password })
        // console.log(error, "error schema login validate");

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false })
        }

        next()

    } catch (error) {
        console.log(error, "Error in sign middle");
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

module.exports = {
    signupMiddleware,
    loginMiddleware
}