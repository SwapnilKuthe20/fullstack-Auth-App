const mongoose = require('mongoose');

const Mongo_Url = process.env.MONGO_URL

// console.log("👉 MONGO_URL from .env:", process.env.MONGO_URL);

mongoose.connect(Mongo_Url)
    .then(() => {
        console.log("Database Connected !!");
    }).catch((err) => {
        console.log(err, "Error Occured");
    })
