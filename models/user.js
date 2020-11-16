const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstname: {
        type: String, required: true
    },
    lastname: {
        type: String, required: true
    },
    google_id: {
        type: String,
        unique: true
    },
    username: {
        type: String
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String
    },
    passwordToken: {
        type: String,
        unique: true
    },
    emailToken: {
        type: String,
        unique: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", UserSchema)