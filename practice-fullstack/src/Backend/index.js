const express = require('express');
require('dotenv').config();
require('./Models/db');
const app = express();
const Port = process.env.PORT;
const cors = require('cors')
const router = require('./Routes/AuthRoutes');
const productRouter = require('./Routes/ProductRouter')

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', router)
app.use('api/products', productRouter)

// testing middleware
// app.get('/swap', (req, res) => {
//     console.log("Request received on /swap");
//     res.send("Hellow Swapnil !!")
// })

app.listen(Port, () => {
    console.log(`Server Runs on Port : ${Port}`);
})