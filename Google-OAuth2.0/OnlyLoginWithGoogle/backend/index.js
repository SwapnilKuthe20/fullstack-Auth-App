const express = require("express");
require("dotenv").config()
const cookieParser = require('cookie-parser')
require('./Models/db')

const cors = require('cors');
const { googleRoute } = require("./Routes/googleRoute");
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use(cookieParser())

// app.get('/home', (req, res) => {
//     res.send("Hello bhai swap !!")
// })

app.use('/api/auth', googleRoute)

const Port = process.env.Port

app.listen(Port, () => {
    console.log(`Serrver runs on Port : ${Port}`);
})

