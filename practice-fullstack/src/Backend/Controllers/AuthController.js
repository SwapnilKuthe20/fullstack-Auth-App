const userModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

const signup = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existUser = await userModel.findOne({ email });
        // console.log(existUser, "...userExist Signup");
        if (existUser) {
            res.status(400).json({ message: "Email already registered !!", success: false })
        }

        const hashesPass = await bcrypt.hash(password, 10);     //bcrypt.hash() is an asynchronous function
        // console.log(hashesPass, "...hashedPass");

        const newUser = new userModel({ name, email, password: hashesPass })
        await newUser.save();

        return res.status(201).json({ message: "User Signup Successfully !!", success: true })

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ message: "Something Went Wrong !", success: false })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email });
        console.log(userExist, "...userExist");

        if (!userExist) {
            return res.status(400).json({ message: "Please enter valid Email or Password", success: false })
        }

        const passCheck = await bcrypt.compare(password, userExist.password);
        // console.log(passCheck, "...passCheck");         // true
        if (!passCheck) {
            return res.status(400).json({ message: "Please enter valid Email or Password ", success: false })
        }

        const access_token = jsonWebToken.sign(
            { userId: userExist._id, email: userExist.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRE }
        )

        const refresh_token = jsonWebToken.sign(
            { userId: userExist._id, email: userExist.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: process.env.REFRESH_EXPIRE }
        )

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000         // 7 days
        })

        return res.status(200).json({
            success: true,
            message: "login successfully !!",
            access_token,
            user: {
                name: userExist.name,
                email: userExist.email
            }
        })

    } catch (err) {
        console.log(err, "err in login");

        return res.status(500).json({ message: "Something Went Wrong !", success: false })
    }
}

const refreshToken = async (req, res) => {
    try {
        console.log(req, "..req");


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong !!", success: false })
    }
}

module.exports = {
    signup,
    login
}




