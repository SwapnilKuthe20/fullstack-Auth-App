const mongoose = require('mongoose');
require('dotenv').config(); 

const Mongo_url = process.env.MONGO_URL;
// console.log(Mongo_url, "... mongo Url");

mongoose.connect(Mongo_url)
    .then(() => {
        console.log("MongoDB connected...!");
    }).catch((err) => {
        console.log("MongoDB connection fail...?? ", err);
    })