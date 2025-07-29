const express = require('express');         // import express 
require('./Models/db');
const AuthRouter = require('./Routes/AuthRouter')
const productRouter = require('./Routes/ProductRouter')
const cors = require('cors');
// const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');


require('dotenv').config();
// config()==> .env file padho aur envirnment variables ko node k process.env object me daal do.

const app = express();                      // app object h --> express app ka obj/instance create 
// app se hm server, middleware , routes define/ handle krte h 

// Middleware
app.use(express.json());         // JSON parse karega
app.use(cors({
    origin: "http://localhost:5173", // frontend
    credentials: true, // allow cookies
}));                    // Cross-origin allow karega


// Use cookie-parser middleware
app.use(cookieParser());

// Health check route / test route
app.get('/tik', (req, res) => {
    res.send("tok")
})

// Routes
app.use('/auth', AuthRouter)        // '/auth' requests is router ko milengi
app.use('/products', productRouter)

// app.use() Express ka middleware register karne ka function hai.
// Iska kaam hai:
// “Express ko batana ki jab koi request aaye, to is function ko run karo — chahe koi bhi path ho (unless specified).”


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {            // listen() --> server run krta h
    console.log(`Server is running on ${PORT}`);
})                                  