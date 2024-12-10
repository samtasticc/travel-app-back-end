const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const travelRouter = require('./controllers/travels.js')
const testJWTRouter = require('./controllers/test-jwt.js')
const usersRouter = require('./controllers/users.js')
const profilesRouter = require('./controllers/profiles.js')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
})

app.use(cors())
app.use(express.json())

app.use('/test-jwt', testJWTRouter)
app.use('/users', usersRouter)
app.use('/profiles', profilesRouter)
app.use('/travels', travelRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
})