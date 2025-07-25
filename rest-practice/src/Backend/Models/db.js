const mongoose = require('mongoose');


const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL)
    .then(() => {
        console.log("MongoDB connected..! ");
    }).catch((err) => {
        console.log("MongoDB not connected ??");
    })