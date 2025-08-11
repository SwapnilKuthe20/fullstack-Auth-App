const express = require('express')
require('dotenv').config()
require('./Models/db')
const cors = require('cors')
const route = require('./Routes/loginRoute')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

app.use('/api/auth', route)

app.get('/home', (req, res) => {
    res.send("WElcome bhai Swap !!")
})

const Port = process.env.PORT
app.listen(Port, () => {
    console.log(`Server runs on Port : ${Port}`);
})


