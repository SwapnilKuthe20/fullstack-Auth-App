const express = require('express');
const app = express();
require('dotenv').config();
require('./Models/db')


// console.dir(app, "...app");

const PORT = process.env.Port || 5051
// console.log(PORT, "...Port");

app.get('/swap', (req, res) => {
    res.send("Hii, swapnil");
})


app.listen(PORT, () => {
    console.log(`Serever runs on ${PORT}`);
})


