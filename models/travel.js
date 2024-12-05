const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    name:  {
        type: String,
        required: true,
    },
    duration:  {
        type: String,
        required: true,
    },
    cost:  {
        type: String,
        required: true,
    },
})

const travelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    flights: {
        type: String,
        required: true,
    },
    hotels: {
        type: String,
        required: true,
    },
    restaurants: {
        type: String,
        required: true,
    },
    activity: [activitySchema],
}, {timestamps: true})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordConfirm: {
        type: String,
        required: true,
    },
    travel: [travelSchema]
})

const User = mongoose.model('User', userSchema)

module.exports = User