const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const generateTokens = (user) => {
//     const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
//     const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
//     return { accessToken, refreshToken };
// };

// 🟢 SIGNUP
exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ msg: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hash });
        await newUser.save();

        // const tokens = generateTokens(newUser);

        res.status(201).json({
            // ...tokens,
            user: {
                id: newUser._id,
                email: newUser.email,
            }
        });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ msg: "Error signing up" });
    }
};

// login LocalStorage m token set krne ...
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const accessToken = jwt.sign({ id: user._id }, "ACCESS_SECRET", { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, "REFRESH_SECRET", { expiresIn: "7d" });

    res.status(200).json({
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            email: user.email
        }
    });
};

// login httpOnly Cookie se token store krne :
// exports.login = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     // Generate both tokens
//     const accessToken = jwt.sign({ id: user._id }, "ACCESS_SECRET", { expiresIn: "15m" });
//     const refreshToken = jwt.sign({ id: user._id }, "REFRESH_SECRET", { expiresIn: "7d" });

//     // Set refresh token as httpOnly cookie
//     res.cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: false,       // ✅ set to true in production (HTTPS)
//         sameSite: "Lax",
//         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });

//     // Send access token and user info in response
//     res.status(200).json({
//         msg: "Login successful",
//         accessToken, // 👈 frontend will store this in memory/localStorage
//         user: {
//             id: user._id,
//             email: user.email
//         }
//     });
// };


// 🟢 REFRESH TOKEN in localStorage ::
// exports.refresh = (req, res) => {
//     const { token } = req.body;
//     if (!token) return res.sendStatus(401);
//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
//         res.json({ accessToken });
//     });
// };

// 🟢 REFRESH TOKEN in httpOnly Cookie ::
exports.refresh = (req, res) => {
    const token = req.cookies.refreshToken;
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

