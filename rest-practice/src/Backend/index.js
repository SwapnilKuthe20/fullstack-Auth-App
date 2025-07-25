const express = require('express');
const app = express();
require('dotenv').config();

require('./Models/db');
const cors = require('cors');
const Routes = require('./Routes/AuthRoutes');

app.use(express.json())
app.use(cors())

// test route
app.get('/swap', (req, res) => {
    res.send("Hello welcome swapnil !!")
})

app.use('/api/auth', Routes)

const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server runs on Port : ${Port}`);
})

