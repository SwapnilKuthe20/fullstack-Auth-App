const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',  // <- Don't use '*'
    credentials: true                // <- Allow credentials
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () => {
            console.log("Server running on port", process.env.PORT);
        });
    })
    .catch((err) => console.error("MongoDB error", err));


console.log(process.env.MONGO_URI, ".env")



// ------------------------------------------------

// // Code for Access token expire

// const express = require("express");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const ACCESS_SECRET = "ACCESS_SECRET_KEY";

// // Dummy login route
// app.post("/api/login", (req, res) => {
//     const { email } = req.body;
//     const token = jwt.sign({ email }, ACCESS_SECRET, { expiresIn: "10s" }); // ⏱ 10 sec expiry
//     res.json({ accessToken: token });
// });

// // Protected route
// app.get("/api/protected", (req, res) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer "))
//         return res.status(401).json({ msg: "No token provided" });

//     const token = authHeader.split(" ")[1];

//     try {
//         const decoded = jwt.verify(token, ACCESS_SECRET);
//         res.json({ msg: "Protected data accessed ✅", user: decoded });
//     } catch (err) {
//         res.status(401).json({ msg: "Token invalid or expired ❌" });
//     }
// });

// app.listen(5001, () => console.log("Server running on http://localhost:5001"));

