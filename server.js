const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const travelRouter = require('./controllers/travels.js')

const testJWTRouter = require('./controllers/test-jwt.js')


mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`) // delete this on cleanup
})

app.use(express.json())

// ROUTES go below this line
app.use('/test-jwt', testJWTRouter)
app.use('/travels', travelRouter)


// ROUTES go above this line
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('port is travelling') // delete this on cleanup
})