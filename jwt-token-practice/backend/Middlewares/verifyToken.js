const { json } = require('express')
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    try {

        const bearerToken = req.headers["authorization"]
        // console.log(bearerToken, "....bearerToken");


        if (!bearerToken) {
            return res.status(400).json({ message: "Header does not found !!", success: false })
        }

        const token = bearerToken.split(" ")[1]
        if (!token) {
            return res.status(400).json({ message: "Token does not found !!", success: false })
        }

        const verifyJWT = jwt.verify(token, process.env.ACCESS_TOKEN)   // decode payload
        // console.log(verifyJWT, "...verifyJWT");

        req.user = verifyJWT;

        next();

    } catch (err) {
        // console.log("Internal server error ", err);
        if (err.name === "JsonWebTokenError" && err.message === "invalid token") {
            return res.status(401).json({
                message: "Invalid token. Please enter a valid token.",
                success: false,
            });
        } else if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "JWT expired. Please login again.",
                success: false,
            });
        } else {
            return res.status(500).json({
                message: "Internal server error.",
                success: false,
            });
        }
    }
}

module.exports = { verifyToken }