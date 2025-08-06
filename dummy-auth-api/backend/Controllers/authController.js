const { usermodel } = require("../Models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        const userExist = await usermodel.findOne({ email })

        if (userExist) {
            return res.status(400).json({ message: "Email already registered !!", success: false })
        }

        const hashPass = await bcrypt.hash(password, 10)

        const newUser = new usermodel({ userName, email, password: hashPass })
        await newUser.save();

        return res.status(201).json({
            message: "signup success",
            success: true,
            user: {
                userName,
                email
            }
        })

    } catch (err) {
        console.log(err, "Error in signup controller");
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await usermodel.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ message: "please enter valid email or password ", success: false })
        }

        const checkPass = await bcrypt.compare(password, userExist.password)
        console.log(checkPass, "....checkPass");

        if (!checkPass) {
            return res.status(400).json({ message: "please enter valid email or password ", success: false })
        }

        const accessToken = jwt.sign(
            { userId: userExist._id, email: userExist.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRY }
        )

        const refreshToken = jwt.sign(
            { userId: userExist._id, email: userExist.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: process.env.REFRESH_EXPIRY }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: true,
            maxAge: 7 * 24 * 60 * 60 * 1000     // 7days
        })

        return res.status(200).json({
            message: "Login success",
            success: true,
            accessToken: accessToken,
            user: {
                userId: userExist._id,
                email: userExist.email,
            }
        })

    } catch (err) {
        console.log(err, "Error in login controller");
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

const refreshToken = async (req, res) => {
    try {

        // const refresh_Token = req.headers.cookie
        // console.log(refresh_Token, "...refresh token controller");

        const refresh_Token = req.cookies.refreshToken;
        console.log(refresh_Token, "...refresh token controller");


        if (!refresh_Token) {
            return res.status(400).json({ message: "Refresh token is required", success: false })
        }

        // const token = refresh_Token.split("=")[1]
        // console.log(token, "...refresh token ");

        // console.log(process.env.REFRESH_TOKEN, "...process.env.REFRESH_TOKEN");


        const decodePayload = jwt.verify(refresh_Token, process.env.REFRESH_TOKEN)
        // console.log(decodePayload, "...decodePayload");

        const newAccessToken = jwt.sign(
            { userId: decodePayload._id, email: decodePayload.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRY }
        )

        req.user = decodePayload

        return res.status(200).json({ message: "new token generated ", success: true, accessToken: newAccessToken })


    } catch (err) {
        console.log(err, "Error in refreshToken controller");
        return res.status(500).json({ message: "Internal Server Error", success: false })
    }
}

module.exports = {
    signupController,
    loginController,
    refreshToken
}