const mongoose = require('mongoose');
// require('dotenv').config();

const Mongo_Url = process.env.MONGO_URL;
console.log(Mongo_Url, "...mongo urlll");


mongoose.connect(Mongo_Url)
    .then(() => {
        console.log('MongoDB connected !!');
    }).catch((err) => {
        console.log("MongoDB not connected !!", err);
    })