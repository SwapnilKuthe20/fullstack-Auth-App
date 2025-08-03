const Joi = require('joi')

const signupValidation = (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const schema = Joi.object({
            userName: Joi.string().min(4).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(15).required(),
        })

        const { error } = schema.validate({ userName, email, password })

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false })
        }

        next()          // ✅ Only call next() if validation passes

    } catch (err) {
        console.log("Something went wrong signup catch", err);
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

const loginValidation = (req, res, next) => {
    try {
        const { email, password } = req.body;

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(20).required()
        })

        const { error } = schema.validate({ email, password })

        if (error) {
            res.status(400).json({ message: error.details[0].message, success: false })
        }

        next()

    } catch (err) {
        console.log(err, "Something went wrong !!");
        res.status(500).json({ message: "Internal server error", success: false })

    }
}


module.exports = {
    signupValidation,
    loginValidation
}
