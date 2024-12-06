const User = require('../models/travel.js')
const express = require('express')
const router = express.Router()

// user section - adding the users.js file may change the trajectory of this.
router.post('/user', async (req, res) => {
    try{
        console.log(req.body)
        const createdUser = await User.create(req.body)
        res.status(201).json(createdUser)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// travel section - adding the users.js file may change the trajectory of this.
router.post('/travel/:userid', async (req, res) => {
    try{
        console.log(req.body)
        const foundUser = await User.findById(req.params.userid)
        // found user, now we want to push the travel wishlist item to the wishlist
        // first, check req.body is formatted to go into the travelSchema
        foundUser.travel.push(req.body)
        // save the user manually, check our work (send)
        await foundUser.save()


        res.status(201).json(foundUser)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

// activity section - adding the users.js file may change the trajectory of this.
router.post('/activity/:userid/:travelid', async (req, res) => {
    try{
        console.log(req.body)
        const foundUser = await User.findById(req.params.userid)
        // now we need to filter the travel array by the travelid. will give us the psecific id
        const foundTravel = foundUser.travel.filter((item) => {
            return String(item._id) === req.params.travelid
        })
        // make sure our req.body is formatted to the activitySchema
        console.log(foundTravel[0].activity.push(req.body))

        await foundUser.save()
        

        res.status(201).json(foundUser)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})



module.exports = router