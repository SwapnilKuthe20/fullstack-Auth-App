const UserModel = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config()

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingEmail = await UserModel.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "Email already registered !!" })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ name, email, password: hashPassword })
        await newUser.save()

        return res.status(200).json({
            success: true,
            message: "user created successfully ",
        })

    } catch (err) {
        console.log("Error ocuure", err);
        return res.status(500).json({ message: "Internal server Error", success: false })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await UserModel.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                message: "Email is not registered yet ??",
                success: false
            })
        }

        const checkPassword = await bcrypt.compare(password, userData.password)

        if (!checkPassword) {
            return res.status(400).json({
                success: false,
                message: "Password is incorrect, please enter correct pasword "
            })
        }

        const access_token = jsonWebToken.sign(
            { userId: userData._id, email: userData.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: '15m' }
        )

        const refresh_token = jsonWebToken.sign(
            { userId: userData._id, email: userData.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: '7d' }
        )

        return res.status(200).json({
            message: "User login Succesfully !!",
            success: true,
            access_token,
            refresh_token,
            user: {
                name: userData.name,
                email: userData.email
            }
        })

    } catch (err) {
        console.log("Error ocuure", err);
        return res.status(500).json({ message: "Internal server Error", success: false })
    }
}

module.exports = {
    signup,
    login
}