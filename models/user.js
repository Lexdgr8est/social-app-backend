const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstname: {
        type: String, required: true
    },
    lastname: {
        type: String, required: true
    },
    google_id: {
        type: String
    },
    email: {
        type: String, required: true
    },
    password: {
        type: String
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", UserSchema)