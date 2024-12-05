const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const travelRouter = require('./controllers/travels.js')
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`) // delete this on cleanup
})

app.use(express.json())

// ROUTES go below this line

app.use('/travels', travelRouter)

// ROUTES go above this line
app.listen(3000, () => {
    console.log('port 3000 is travelling') // delete this on cleanup
})