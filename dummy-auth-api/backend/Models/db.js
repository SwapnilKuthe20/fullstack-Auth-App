const mongoose = require('mongoose')

const Mongo_URL = process.env.MONGO_URL
// console.log(Mongo_URL, "...Mongo_URL");


mongoose.connect(Mongo_URL)
    .then(() => {
        console.log("MongoDb connected..!!");
    }).catch((err) => {
        console.log("MongoDb Disconnected !!", err);
    })
