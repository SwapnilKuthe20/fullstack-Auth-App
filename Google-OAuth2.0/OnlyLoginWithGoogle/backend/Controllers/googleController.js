const { OAuth2Client } = require("google-auth-library");
const { userModel } = require("../Models/userModel");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const jwt = require('jsonwebtoken')

const googleController = async (req, res) => {
    try {
        const { credential } = req.body
        // console.log(credential, "....credential");

        if (!credential) {
            return res.status(400).json({ message: "Google credential not found !" })
        }

        const LoginTicket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        // console.log(LoginTicket, "...token");

        const payload = LoginTicket.getPayload()
        // console.log(payload, "....payload");

        const { name, email,email_verified } = payload

        if (!email || !email_verified) {
            return res.status(400).json({ message: "Email not found !" })
        }

        let user = await userModel.findOne({ email })
        if (!user) {
            const newUser = new userModel({
                name,
                email,
                authType: "google"
            })

            user = await newUser.save()
        } else {
            if (!user.authType) {
                user.authType = "google"
                await user.save();
            }
        }

        const access_token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXP }
        )

        const refresh_token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: process.env.REFRESH_EXP }
        )

        res.cookie("refreshToken", refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000     // 7 days
        })

        return res.status(200).json({
            message: "Google Login SuccessFully !!",
            success: true,
            accessToken: access_token,
            user: {
                name: user.name,
                email: user.email,
                authType: user.authType
            }
        })

    } catch (error) {
        return res.status(500).json({ message: "Internal server error !", success: false })
    }
}

module.exports = { googleController }
