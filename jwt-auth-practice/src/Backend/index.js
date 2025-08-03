const express = require('express');
const { authRoute } = require('./Routes/AuthRoute');
require('dotenv').config();
require('./Models/db');
const app = express();
const cors = require('cors')


app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
//  credentials: true --->
//➤ Cookies, Authorization headers, etc. frontend se backend tak jane ki permission deta hai
// (especially needed for refreshToken via cookie)

// test Middleware route
app.get('/home', (req, res) => {
    res.send('Hello Swapnil Bhai !!')
})

app.use('/api/auth', authRoute)

const Port = process.env.PORT

app.listen(Port, () => {
    console.log(`Server RUns on POrt : ${Port}`);
})