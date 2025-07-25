const Joi = require('joi');

const signupMiddleware = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(15).required()
    })

    const { error } = schema.validate(req.body);
    // console.log(error, "...error in middleware");


    if (error) {
        return res.status(400).json({
            message: error.details[0].message,    // Optional: show specific error, success: false })
            success: false
        })
    }
    next();
}

const loginMiddleware = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(15).required()
    })

    const { error } = schema.validate(req.body);

    // console.log(error, "...error in middleware");


    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            success: false
        })
    }

    next();
}

module.exports = {
    signupMiddleware,
    loginMiddleware
}