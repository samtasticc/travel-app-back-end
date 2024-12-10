const TravelList = require('../models/travel.js')
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verify-token')
// const {decode} = require('jsonwebtoken')

router.use(verifyToken)

router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id
        const travel = await TravelList.create(req.body)
        travel._doc.author = req.user
        res.status(201).json(travel)
    }catch(error){
        res.status(500).json(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const travels = await TravelList.find({}).populate('author', 'username')
        res.status(200).json(travels)
    }catch(error){
        res.status(500).json(error)
    }    
})

router.get('/:travelId', async (req, res) => {
    try {
        const travel = await TravelList.findById(req.params.travelId).populate('author')
        res.status(200).json(travel)
    }catch(error){
            res.status(500).json(error)
        }
})

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