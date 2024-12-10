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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    activity: [activitySchema],
}, {timestamps: true})

const TravelList = mongoose.model('TravelList', travelSchema)

module.exports = TravelList