const TravelList = require('../models/travel.js')
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verify-token')

// PUBLIC ROUTES

// PROTECTED ROUTES
router.use(verifyToken)


// TRAVELS ROUTES

// CREATE ROUTE
router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id
        const travel = await TravelList.create(req.body)
        travel._doc.author = req.user
        res.status(201).json(travel)
        // const createdTravel = await TravelList.create(req.body)
        // res.status(201).json(createdTravel)
    }catch(error){
        res.status(500).json(error)
    }
})

// INDEX ROUTE
router.get('/', async (req, res) => {
    try {
        const travels = await TravelList.find({})
            .populate('author')
            .sort({ createdAt: 'desc'})
        // const foundTravel = await TravelList.find()
        res.status(200).json(travels)
    }catch(error){
        res.status(500).json(error)
    }    
})

// SHOW ROUTE
router.get('/:travelId', async (req, res) => {
    try {
        const travel = await TravelList.findById(req.params.travelId).populate('author')
        res.status(200).json(travel)
    }catch(error){
            res.status(500).json(error)
        }
})

// UPDATE ROUTE
router.put('/:travelId', async (req, res) => {
    try {
        const travel = await TravelList.findById(req.params.travelId)

        if (!travel.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that.")
        }

        const updatedTravel = await TravelList.findByIdAndUpdate(req.params.travelId, req.body, {new: true})

        updatedTravel._doc.author = req.user
        res.status(200).json(updatedTravel)
    }catch(error){
        res.status(500).json(error)
    }    
})

// DELETE ROUTE
router.delete('/:travelId', async (req, res) => {
    try {
        const travel = await TravelList.findById(req.params.travelId)

        if (!travel.author.equals(req.user._id)) {
            return res.status(403).send("You're not allowed to do that.")
        }

        const deletedTravel = await TravelList.findByIdAndUpdate(req.params.travelId)
        res.status(200).json(deletedTravel)
    }catch(error){
            res.status(500).json(error)
        }
})

// ACTIVITY ROUTES

// CREATE ROUTE
router.post('/:travelId/activity', async (req, res) => {
    try {
        req.body.author = req.user._id
        const travel = await TravelList.findById(req.params.travelId)
        travel.activity.push(req.body)
        await travel.save()
        const newActivity = travel.activity[travel.activity.length - 1]

        newActivity._doc.author = req.user
        res.status(201).json(newActivity)
    } catch (error) {
        res.status(400).json(error)
    }   
})

// INDEX ROUTE
// is this even needed? might be able to find out when full app is deployed.
// router.get('/', async (req, res) => {
//     try {
//         const foundTravel = await TravelList.find()
//         res.status(200).json(foundTravel.activity)
//     }catch(err){
//         res.status(500).json({error: err.message}) 
//     }    
// })

// SHOW ROUTE
// router.get('/:travelId/activity', async (req, res) => {
//     try {
//         const foundTravel = await TravelList.findById(req.params.travelId)
//         if (!foundTravel) return res.status(404).json({ message: 'Travel not found' })
//         res.status(200).json(foundTravel.activity)
//     }catch(err){
//         res.status(500).json({error: err.message}) 
//     }    
// })

// UPDATE ROUTE

router.put('/:travelId/activity/:activityId', async (req, res) => {
    try {
        const travel = await TravelList.findById(req.params.travelId)
        const activity = travel.activity.id(req.params.activityId)
        activity.text = req.body.text
        await travel.save()
        res.status(200).json({message: 'Ok'})
    }catch(error){
        res.status(500).json(error)
    }   
})


// DELETE ROUTE

router.delete('/:travelId/activity/:activityId', async (req, res) => {
    try {
        const travel = await TravelList.findById(req.params.travelId)
        travel.activity.remove({ _id: req.params.activityId})
        await travel.save()
        res.status(200).json({message: 'Ok'})
    }catch(error){
        res.status(500).json(error)
    }   
})


module.exports = router