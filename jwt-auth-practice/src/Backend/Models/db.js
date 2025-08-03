const mongoose = require('mongoose')

const MongoURL = process.env.MONGO_URL

// console.log(MongoURL, "..Database");

mongoose.connect(MongoURL)
    .then(() => {
        console.log("Database Connected  !");
    }).catch((err) => {
        console.log("Database Disconnected !", err);
    })
