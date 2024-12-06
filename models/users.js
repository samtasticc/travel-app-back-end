const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    passwordConfirm: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("User", userSchema)