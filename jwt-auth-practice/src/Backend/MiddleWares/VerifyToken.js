


const verifyToken = (req, res, next) => {
    try {

        const accessTokenExist = req.headers.accessToken

        console.log(accessTokenExist, "accessTokenExist");




        next()

    } catch (err) {
        console.log(err, "...err");
        res.status(500).json({ message: "Internal server Error", success: false })
    }
}

module.exports = { verifyToken }