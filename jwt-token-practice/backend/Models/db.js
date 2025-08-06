const mongoose = require('mongoose')

const Mongo_URL = process.env.MONGO_URL;

mongoose.connect(Mongo_URL)
    .then(() => {
        console.log("Database Connected successfully !!");

    }).catch((err) => {
        console.log("Database DisConnected !!", err);
    })