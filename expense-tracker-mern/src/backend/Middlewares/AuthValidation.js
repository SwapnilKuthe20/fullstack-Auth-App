const Joi = require('joi');

const signupValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().min(4).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(10).required()
    })

    const { error } = schema.validate(req.body)
    console.log(error, "...error logValidation");

    if (error) {
        return res.status(400).json({ message: error.details[0], success: false })
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(10).required()
    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0], error })
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}