
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
require('dotenv').config();
const userModel = require('../Models/User')
// Yeh User ek Mongoose Model hai. Jab tu mongoose.model() se koi model banata hai, 
// toh wo ek JavaScript class ban jata hai jisme bahut saare built-in methods hote hain.

const signup = async (req, res) => {
    console.log("🛡️ Signup route hit", req.method, req.url);
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "Email is already registered !", success: false })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // bcrypt.hash(password, saltRounds)
        // Salt Rounds = 10 ⇒ it means kitni complexity se encrypt kare.

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        // return res.send("Signin successfully !!")
        return res.status(201).json({
            message: "Signin successfully !!",
            success: true
        })
    } catch (err) {
        console.log(err, "...catch signin");

        return res.status(500).json({
            message: "Internal server error ",
            success: false
        })
    }
}

const login = async (req, res) => {
    console.log("🔐 Login route hit", req.method, req.url);
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Email not registered ??", success: false })
        }

        const isPassCorrect = await bcrypt.compare(password, user.password)

        if (!isPassCorrect) {
            return res.status(400).json({ message: "Incorrect Password ", success: false })
        }

        const access_token = jsonWebToken.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )


        const refresh_token = jsonWebToken.sign(
            { userId: user._id, email: user.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
        )

        return res.status(200).json({
            success: true,
            message: "LoginSuceessfully !",
            access_token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        // console.log(err, "...catch login");
        return res.status(500).json({ message: "Internal server error", success: false })
    }
}

module.exports = { signup, login };