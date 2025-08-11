const { OAuth2Client } = require("google-auth-library");
const { userModel } = require("../Models/userModel");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const jwt = require('jsonwebtoken')


const loginController = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ message: "google credential not found ", success: false })
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        const { email, name, picture, email_verified } = payload

        if (!email || !email_verified) {
            return res.status(400).json({ message: 'Google account email not verified', success: false });
        }

        let user = await userModel.findOne({ email })

        if (!user) {
            const newUser = new userModel({
                name: name || email.split("@")[0],
                email: email,
                password: null,
                authType: "google"
            })

            user = await newUser.save()
        } else {
            if (!user.authType) {
                user.authType = "google"
            }
            if (!user.picture && picture) user.picture = picture;

            await user.save();
        }

        const access_token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRY }
        )

        const refresh_token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: process.env.REFRESH_EXPIRY }
        )

        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 7 * 24 * 24 * 60 * 1000     // 7 days
        })

        return res.status(200).json({
            message: 'Google login successful',
            success: true,
            accessToken: access_token,
            user: {
                userName: user.userName,
                email: user.email,
                picture: user.picture,
            },
        });

    } catch (error) {
        console.error('Google login error:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}

module.exports = loginController