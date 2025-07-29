const express = require('express')
const Router = express.Router()
const verifyToken  = require('../Middlewares/verifyToken')

Router.get('/', verifyToken , (req, res) => {
    return res.status(200).json([

        {
            product: "Mobile",
            Price: 12000
        },
        {
            product: "Laptop",
            Price: 55000
        },
        {
            product: "TV",
            Price: 30000
        },
    ])
})

module.exports = Router