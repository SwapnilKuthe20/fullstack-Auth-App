const express = require("express");
const app = express();
// console.log(app, "...app");

require('dotenv').config();
require('./Models/db');
const cors = require('cors')
const AuthRoutes = require('./Routes/AuthRoutes')

app.use(express.json())
app.use(cors())


app.get('/swap', (req, res) => {
    res.send("HEllo swapmil ..!!")
})

app.use('/api/auth', AuthRoutes)

const Port = process.env.PORT

app.listen(Port, () => {
    console.log(`Server start on port : ${Port}`);
})