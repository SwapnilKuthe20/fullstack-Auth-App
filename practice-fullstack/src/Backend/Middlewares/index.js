const express = require('express');
require('dotenv').config();
require('./Models/db');
const app = express();
const Port = process.env.PORT;
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./Routes/AuthRoutes');
const productRouter = require('./Routes/ProductRouter')

app.use(express.json());    // 	JSON body ko parse karta hai (req.body banata hai)
app.use(cors({              // CORS policy set karta hai (frontend se requests allow)
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser());    // 	Cookies ko read/parse karta hai (req.cookies)

// 🔸 Cookie - Parser Middleware kya karta hai ?
//     cookie - parser ek middleware hai jo Express app mein aane wale cookies ko read aur parse karta hai 
//     — matlab, request ke saath jo cookies browser se aati hain, unko easily access karne laayak bana deta hai.

app.use('/api/auth', router)
app.use('/api/products', productRouter)

// testing middleware
// app.get('/swap', (req, res) => {
//     console.log("Request received on /swap");
//     res.send("Hellow Swapnil !!")
// })

app.listen(Port, () => {
    console.log(`Server Runs on Port : ${Port}`);
})


// 🔹 app.use() Kya Hota Hai?
// app.use() ek middleware function hai jo Express application ke andar use hota hai.

// Iska kaam hai: middleware ya route handler ko Express app ke saath register karna.
// app.use()	Middleware ko register karta hai
// Runs for all routes	Agar path na diya ho ::
// Can limit to specific path	By providing path

// Haan bhai — app.use() ke andar tumne express.json(), cors(), aur cookieParser() lagaya bina path ke
// — iska matlab hai ki ye teeno middleware sabhi requests pe chalenge, GET, POST, PUT, DELETE sab pe.