const express = require('express');
require('dotenv').config();
require('./Models/db')
const { authRoute } = require('./Routes/authRoute');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { productRoute } = require('./Routes/productRoute');

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())

// testing middleware route 
app.get("/home", (req, res) => {
    return res.send("Hello Bhai Kaise ???")
})

app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)

const Port = process.env.PORT
// console.log(Port, "...POrt");

app.listen(Port, () => {
    console.log(`Server runs on Port : ${Port}`);
})