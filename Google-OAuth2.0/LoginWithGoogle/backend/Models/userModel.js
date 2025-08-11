const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.authType !== "google"
        }
    },
    authType: {
        type: String,
        enum: ["local", "google"], // optional but good for consistency
        default: "local"
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = { userModel };