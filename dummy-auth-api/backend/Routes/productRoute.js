const express = require('express')
const { verifyToken } = require('../Middlewares/verifyToken')
const productRoute = express.Router()

productRoute.get('/', verifyToken, (req, res) => {
    return res.status(200).json([
        {
            productName: "Moto g45",
            price: 14000,
            brand: "Moto"
        },
        {
            productName: "Oppo neo",
            price: 13600,
            brand: "Oppo"
        },
        {
            productName: "Nokia 2611",
            price: 11000,
            brand: "Nokia"
        },
        {
            productName: "Samsung Champ",
            price: 140000,
            brand: "Samsung"
        },
    ])
})

module.exports = { productRoute }