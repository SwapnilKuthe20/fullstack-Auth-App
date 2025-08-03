const { userModel } = require("../Models/UserModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
    try {

        const { userName, email, password } = req.body;

        const userExist = await userModel.findOne({ email })
        // console.log(userExist, "... userExist signup");

        if (userExist) {
            return res.status(400).json({ message: "User already Registered !!", success: false })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = new userModel({ userName, email, password: hashPass })
        await newUser.save()

        return res.status(201).json({       // 201 = resource successfully created
            success: true,
            message: "Signup Successfully !",
            user: {
                userName: newUser.userName,
                email: newUser.email
            }
        })

    } catch (err) {
        console.log("Internal Server Error !!", err);
        return res.status(500).json({ message: "Internal Server Error !", success: false })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const existUser = await userModel.findOne({ email })

        if (!existUser) {
            return res.status(400).json({ message: "Invalid Email or Password !", success: false })
        }

        const passVerify = await bcrypt.compare(password, existUser.password)

        if (!passVerify) {
            return res.status(400).json({ message: "Invalid Email or Password !", success: false })
        }

        const access_token = jwt.sign(
            { userId: existUser._id, email: existUser.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRY }
        )

        const refresh_token = jwt.sign(
            { userId: existUser._id, email: existUser.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: process.env.REFRESH_EXPIRY }
        )

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000     // 7days
        })

        return res.status(200).json({
            message: "Login successfully !",
            success: true,
            accessToken: access_token,
            user: {
                userId: existUser._id,
                userName: existUser.userName,
                email: existUser.email
            }
        })

    } catch (err) {
        console.log("Internal Server Error !", err);
        return res.status(500).json({ message: "Internal Server Error !", success: false })
    }
}

module.exports = {
    signup,
    login
}