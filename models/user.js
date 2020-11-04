const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    google_id: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", UserSchema)