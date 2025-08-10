const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
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
            // password tabhi required ho jab user Google login se nahi bana ho
            return this.authType !== 'google';
        }
    },
    authType: {
        type: String,
        enum: ['local', 'google'], // future me aur providers add kar sakte ho
        default: 'local'
    },
    picture: {
        type: String, // Google profile pic URL
        default: null
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)

module.exports = { userModel }