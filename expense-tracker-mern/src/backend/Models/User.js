const mongoose = require('mongoose');

// mongoose.Schema ek class (constructor) hai.
// new us class ka naya object banata hai — userSchema.

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // require: true,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        // require: true,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
}, { timestamps: true });

// Jab tum timestamps: true likhte ho schema ke options mein, toh Mongoose automatically do extra fields add kar deta hai:
//     createdAt -->	Document kab banaya gaya
//     updatedAt -->	Document kab last time update hua

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

// mongoose.model('users', userSchema) ka matlab kya hota hai?
// Ye line MongoDB me "users" naam ka collection create karti hai (agar pehle se na ho), jisme documents ka structure userSchema ke according hoga.

// Toh Mongoose automatically iska plural version banata hai, aur lowercase me MongoDB collection ka naam use karta hai.
// Example: 'User' ➝ MongoDB me collection banega "users"

// 🧠 Schema ko model me convert kar ke export kar rahe hain
// Isse "users" collection banega MongoDB me