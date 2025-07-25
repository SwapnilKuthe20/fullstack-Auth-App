const userModel = require("../Models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "email already registered !!" })
        }

        const secPassword = await bcrypt.hash(password, 10);

        // .create() is not used with new — it's a static method that creates and saves the document in one step.

        const newUser = await userModel.create({ name, email, password: secPassword })

        // if you want to use new and save
        // const newUser1 = new userModel({ name, email, password: secPassword })
        // await newUser1.save();

        return res.status(200).json({ message: "Signup Successfully", success: true })
    } catch (err) {
        console.log(err, "err in catch");
        return res.status(500).json({ message: "Something went wrong !!", success: false })
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await userModel.findOne({ email })

        if (!userExist) {
            return res.status(400).json({ message: "Email not registered", success: false })
        }

        const isPassCorrect = await bcrypt.compare(password, userExist.password);
        if (!isPassCorrect) {
            return res.status(400).json({ message: "Password did not match pls enter correct pass !", success: false })
        }

        const accessToken = jwt.sign(
            { userId: userExist._id, name: userExist.name },
            process.env.ACCESS_TOKEN,
            { expiresIn: '15m' }
        )
        const refreshToken = jwt.sign(
            { userId: userExist._id, name: userExist.name },
            process.env.REFRESH_TOKEN,
            { expiresIn: '7d' }
        )

        return res.status(200).json({
            id: userExist._id,
            message: "Login successfully",
            success: true,
            accessToken,
            refreshToken,
            user: {
                name: userExist.name,
                email: userExist.email
            }
        })

    } catch (err) {
        console.log(err, "...err in catch");
        return res.status(500).json({ message: "Something went wrong", success: false })
    }
}

module.exports = {
    signupController,
    loginController
}