const Joi = require('joi');

const signupMiddleware = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(20).required()
    })

    console.log(schema.validate(), "...schema return");


    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: "bad request", error })
    }

    next();
}

const loginMiddleware = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(20).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: "Bad Request !", error })
    }

    next();
}

module.exports = {
    signupMiddleware,
    loginMiddleware
}