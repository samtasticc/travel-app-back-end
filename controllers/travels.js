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

router.get('/:travelsId', async (req, res) => {
    try {
        const foundTravel = await TravelList.findById(req.params.travelsId)
        if (!foundTravel) {
            res.status(404)
            throw new Error('Travel list not found')
        }
        res.status(200).json(foundTravel)
    }catch(err){
        if (res.statusCode === 404) {
            res.json({error: err.message})
        }else{
            res.status(500).json({error: err.message})
        }
    }    
})

router.delete('/:travelsId', async (req, res) => {
    try {
        const deletedTravel = await TravelList.findByIdAndDelete(req.params.travelsId)
        if (!deletedTravel){
            res.status(404)
            throw new Error('Travel list not found.')
        }
        res.status(200).json(deletedTravel)
    }catch(err){
        if(res.statusCode === 404) {
            res.json({error:err.message})
        }else{
            res.status(500).json({error: err.message})
        }
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