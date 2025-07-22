import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Token from "../models/Token.js";
import { v4 as uuidv4 } from "uuid";
import { sendEmail } from "../utils/sendEmail.js";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password)
            return res.status(400).json({ msg: "All fields are required" });

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "Email already registered" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
        });

        // Generate verification token
        const token = uuidv4();
        await Token.create({
            userId: newUser._id,
            token,
        });

        // Send verification email
        const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}&id=${newUser._id}`;
        await sendEmail(
            email,
            "Verify Your Email",
            `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
        );

        res.status(201).json({ msg: "Signup successful, verify your email" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};



export const verifyEmail = async (req, res) => {
    const { token, id } = req.query;

    const storedToken = await Token.findOne({ userId: id, token });
    if (!storedToken) return res.status(400).json({ msg: "Invalid or expired token" });

    await User.findByIdAndUpdate(id, { isVerified: true });
    await Token.findByIdAndDelete(storedToken._id);

    res.status(200).json({ msg: "Email verified successfully" });
};
