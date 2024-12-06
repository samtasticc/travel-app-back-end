const TravelList = require('../models/travel.js')
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verify-token')

router.use(verifyToken)


// TRAVELS ROUTES
router.post('/', async (req, res) => {
    try {
        const createdTravel = await TravelList.create(req.body)
        res.status(201).json(createdTravel)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const foundTravel = await TravelList.find()
        res.status(200).json(foundTravel)
    }catch(err){
        res.status(500).json({error: err.message})
    }    
})

// ! use for the remaining routes
// router.post('/', async (req, res) => {
//     try {

//     }catch(err){
        
//     }    
// })


// ACTIVITY ROUTES


module.exports = router