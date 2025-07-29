const jwt = require('jsonwebtoken')

// 👉 jsonwebtoken library ko import kiya gaya hai. Ye JWT (JSON Web Token) ko verify, sign, decode karne ke kaam aati hai.

const verifyToken  = (req, res, next) => {
    try {

        const authHeader = req.headers['authorization']
        // console.log(Authorization, ".....Authorization");

        if (!authHeader) {
            return res.status(403).json({ message: "Unauthorizes, JWT token is required !", success: false })
        }

        // Token should be like "Bearer xyz123", so split it
        const token = authHeader.split(' ')[1]

        if (!token) {
            return res.status(403).json({ message: "Unauthorized, token not found!", success: false })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        
        next()

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        } else {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = verifyToken ;