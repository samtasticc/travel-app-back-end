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

router.get('/:travelId', async (req, res) => {
    try {
        const foundTravel = await TravelList.findById(req.params.travelId)
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

router.delete('/:travelId', async (req, res) => {
    try {
        const deletedTravel = await TravelList.findByIdAndDelete(req.params.travelId)
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

router.put('/:travelId', async (req, res) => {
    try {
        const updatedTravel = await TravelList.findByIdAndUpdate(req.params.travelId, req.body, {
            new: true,
        })
        if (!updatedTravel){
            res.status(404)
            throw new Error('Travel list not found.')
        }
        res.status(200).json(updatedTravel)
    }catch(err){
        res.status(500).json({error: err.message})
    }    
})

// ACTIVITY ROUTES

router.post('/:travelId/activity', async (req, res) => {
    try {
        const createdTravel = await TravelList.findById(req.params.travelId);
        if (!createdTravel) return res.status(404).json({ message: 'Travel not found' }); // change 'travel' to 'activity'?
        createdTravel.activity.push(req.body);
        res.status(201).json(createdTravel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
})


// ! use for the remaining routes
// router.post('/', async (req, res) => {
//     try {

//     }catch(err){
        
//     }    
// })

module.exports = router