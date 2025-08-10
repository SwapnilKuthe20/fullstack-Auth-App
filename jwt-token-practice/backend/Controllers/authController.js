const { userModel } = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async (req, res) => {
    try {

        const { userName, email, password } = req.body;

        const userExist = await userModel.findOne({ email })
        // console.log(userExist, "...userExist");

        if (userExist) {
            return res.status(400).json({ message: "Email already Registered !", success: false })
        }

        const hashPass = await bcrypt.hash(password, 10)
        // console.log(hashPass, "...hashPass");

        const newUser = new userModel({ userName, email, password: hashPass })
        await newUser.save();

        return res.status(201).json({
            message: "User Signup SuccessFully !!",
            success: true,
            user: {
                userName,
                email
            }
        })

    } catch (error) {
        console.log("Internal server error ", error);
        return res.status(400).json({ message: 'Internal server error', success: false })
    }
}

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email })
        // console.log(userExist, "...userExist");

        if (!userExist) {
            return res.status(400).json({ message: "Email does not registered ", success: false })
        }

        const checkPass = await bcrypt.compare(password, userExist.password)
        // console.log(checkPass, "...checkPass");

        if (!checkPass) {
            return res.status(400).json({ message: "Plase Enter valid Email and Password !", success: false })
        }

        const access_token = jwt.sign(
            { userId: userExist._id, email: userExist.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRY }
        )

        const refresh_token = jwt.sign(
            { userId: userExist._id, email: userExist.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: process.env.REFRESH_EXPIRY }
        )

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000     // 7days
        })

        return res.status(200).json({
            message: "User Login SuccessFully !!",
            success: true,
            accessToken: access_token,
            user: {
                userName: userExist.userName,
                email: userExist.email
            }
        })

    } catch (error) {
        console.log("Internal server error ", error);
        return res.status(400).json({ message: 'Internal server error', success: false })
    }
}

const generateTokenController = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;
        // console.log(refreshToken, "...refreshToken");

        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token not Found', success: false })
        }

        const verifyRefresh = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
        if (!verifyRefresh) {
            return res.status(400).json({ message: 'Refresh token does not match, pls give valid token', success: false })
        }

        const newAccessToken = jwt.sign(
            { userId: verifyRefresh._id, email: verifyRefresh.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRY }
        )

        req.user = verifyRefresh;

        return res.status(200).json({
            message: "New AccessToken generate SuccessFully !!",
            success: true,
            accessToken: newAccessToken,
        })

    } catch (err) {
        console.log("Internal server error ", error);
        return res.status(400).json({ message: 'Internal server error', success: false })
    }
}

const logoutController = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token not found', success: false })
        }

        res.clearCookie('refreshToken', {
            httpOnly: true,
            sameSite: "strict",
            secure: false
        })

        return res.status(200).json({ message: 'Logout successful', success: true });

    } catch (err) {
        return res.status(500).json({ message: 'Internal server error', success: false })
    }
}


module.exports = {
    signupController,
    loginController,
    generateTokenController,
    logoutController
}
