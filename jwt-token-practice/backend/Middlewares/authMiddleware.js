const Joi = require('joi')

const signupMiddleware = (req, res, next) => {
    try {
        const { userName, email, password } = req.body;

        const schema = Joi.object({
            userName: Joi.string().min(4).max(10).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(10).required(),
        })

        const { error } = schema.validate({ userName, email, password })
        // console.log(error);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false })
        }

        next();

    } catch (err) {
        console.log("Internal server error ", err);
        return res.status(400).json({ message: 'Internal server error', success: false })
    }
}

const loginMiddleware = (req, res, next) => {
    try {
        const { email, password } = req.body;

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(10).required(),
        })

        const { error } = schema.validate({ email, password })
        // console.log(error);

        if (error) {
            return res.status(400).json({ message: error.details[0].message, success: false })
        }

        next();

    } catch (err) {
        console.log("Internal server error ", err);
        return res.status(400).json({ message: 'Internal server error', success: false })
    }
}

module.exports = {
    signupMiddleware,
    loginMiddleware
}