const { userModel } = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// google-auth-library se hum Google-issued ID token verify karenge. Client ID auth verification ke liye chahiye.
// Kya: Google ke official library se client bana rahe hain.
// Kyun: verifyIdToken method aur Google ke public keys internal handling ke liye.
// Nahi likha to: Manual token validation risky + Google key rotation handle nahi hoga.

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
            { userId: verifyRefresh.userId, email: verifyRefresh.email },
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

const googleLoginController = async (req, res) => {
    try {
        // 1) frontend se credential token lena (react-oauth/google deta hai 'credential')

        const { credential } = req.body;
        // Kya: Frontend se credential expect kar rahe hain (ye @react-oauth/google se milta hai).
        // Kyun: Ye token bina user verify karna impossible.
        // Nahi likha to: Agar token missing hua to code crash karega ya invalid verification hogi.

        if (!credential) {
            return res.status(400).json({ message: 'Google credential token is required', success: false })
        }

        // 2) Google se token verify karna (signature + audience check)

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        // Kya: Google ko verify karne ke liye server-side call (local verification using Google's JWKS) kar raha hai.
        // Kyun: Ensures token signature valid hai aur token tumhare app ke liye hi issue hua (audience check).
        // Nahi likha to: Bina verify kiye koi fake token accept ho sakta hai → security breach.

        // 3) verified payload (user info) nikal lo

        const payload = ticket.getPayload();
        const { email, name, picture, email_verified } = payload
        // Kya: Verified token ka user data nikal rahe hain.
        // Kyun: Email aur verified flag check karne se unverified Google accounts block ho jayenge.
        // Nahi likha to: Unverified/temporary emails se account ban sakta hai.


        // optional but recommended: ensure google ne email verify kiya hai

        if (!email || !email_verified) {
            return res.status(400).json({ message: 'Google account email not verified', success: false });
        }

        // 4) DB me user check karo - agar pehle se hai to use use karo, warna bana do

        let user = await userModel.findOne({ email })

        if (!user) {
            // create new user for google login
            const newUser = new userModel({
                userName: name || email.split('@')[0],
                email,
                password: null,         //  google users ka local password nahi hota
                authType: "google"      //  helpful to track provider
            })

            user = await newUser.save()

        } else {
            // agar user already exist karta hai lekin authType set nahi hai, update kar do (optional)
            if (!user.authType) {
                user.authType = 'google';
                if (!user.picture && picture) user.picture = picture;
                await user.save();
            }
        }

        // 5) JWTs generate karo (same as normal login flow)
        const access_token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.ACCESS_TOKEN,
            { expiresIn: process.env.ACCESS_EXPIRY }
        );

        const refresh_token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.REFRESH_TOKEN,
            { expiresIn: process.env.REFRESH_EXPIRY }
        );

        // 6) refresh token cookie set karo (httpOnly)
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: false,      // dev: false, production: true (HTTPS)
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // 7) frontend ko access token + user bhej do
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


module.exports = {
    signupController,
    loginController,
    generateTokenController,
    logoutController,
    googleLoginController
}
