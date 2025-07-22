const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    return { accessToken, refreshToken };
};

// 🟢 SIGNUP
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ msg: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hash });
        await newUser.save();

        const tokens = generateTokens(newUser);

        res.status(201).json({
            ...tokens,
            user: {
                id: newUser._id,
                email: newUser.email,
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Error signing up" });
    }
};

// 🟢 LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const tokens = generateTokens(user);

        res.status(200).json({
            ...tokens,
            user: {
                id: user._id,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({ msg: "Error logging in" });
    }
};

// 🟢 REFRESH TOKEN
exports.refresh = (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
        res.json({ accessToken });
    });
};

// 🟢 GET CURRENT USER
exports.getMe = (req, res) => {
    res.json({ user: req.user });
};

