const mongoose = require('mongoose')

const Mongo_Url = process.env.MONGO_URL

mongoose.connect(Mongo_Url)
    .then(() => {
        console.log("Mongo DB Connnected !!");
    })
    .catch((err) => {
        console.log("Mongo DB not Connected ??", err);
    })





