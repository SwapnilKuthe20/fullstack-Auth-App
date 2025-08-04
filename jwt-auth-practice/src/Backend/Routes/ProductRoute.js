const express = require('express')
const { verifyToken } = require('../MiddleWares/VerifyToken')
const route = express.Router()


route.get('/', verifyToken, (req, res) => {
    res.send([
        {
            productName: "Samsung",
            price: 34000,
            model: "mobile"
        },
        {
            productName: "Samsung",
            price: 34000,
            model: "mobile"
        },
        {
            productName: "Samsung",
            price: 34000,
            model: "mobile"
        },
        {
            productName: "Samsung",
            price: 34000,
            model: "mobile"
        },
    ])
})