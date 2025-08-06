const express = require('express');
const { authRouter } = require('./Routes/AuthRoute');
const { productRouter } = require('./Routes/productsRoute');
require('dotenv').config();
require('./Models/db')

const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(cookieParser())

// test middleware 
// app.get('/home', (req, res) => {
//     res.send("Hello Bhai swapnil !! HOw are you ?")
// })

app.use('/api/auth', authRouter)

app.use('/api/products', productRouter)


const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server runs on Port : ${Port}`);
})