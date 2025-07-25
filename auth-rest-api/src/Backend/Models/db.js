const mongoose = require('mongoose');
// require('dotenv').config()

const MongoUrl = process.env.MONGO_URL;

mongoose.connect(MongoUrl)
    .then(() => {
        console.log("MongoDB connected !!");
    }).catch((error) => {
        console.log("MongoDB not connected !!", error);
    })