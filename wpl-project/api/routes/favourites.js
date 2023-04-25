const express = require('express')
const User = require('../models/users')
const Properties = require('../models/properties')
const router = new express.Router()


// Get all the favourites properties of user based on userId
router.get('/:id', async (req, res) => {
    console.log("Get favourites property by userid")
    try {
    console.log("users by id")
    const users = await User.findById(req.params.id)
    const favourites = users.favourites;
    var favouriteProperties = JSON.parse('[]');
    for (i = 0; i < favourites.length; i++) {
        const favouriteProperty = await Properties.findById(favourites[i])
        favouriteProperties.push(favouriteProperty)
    }
    console.log(favouriteProperties)
    if(!favouriteProperties) return res.status(400).send({'error': 'Unable to fetch user\'s favourite properties!'})
    res.send(favouriteProperties)
    } catch(e) {
        res.status(400).send({
            error: 'Error fetching user\'s favourite properties!'
        })
    }
})

// Add property to favourite by user
router.put('/:id', async (req, res) => {
    console.log("Add property to favourites by userid")
    var propertyId = req.query.propertyid;
    const userId = req.params.id;
    try{
        const users = await User.findById(userId)
        let favourites = users.favourites
        favourites = favourites.includes(propertyId) ? favourites : favourites.push(propertyId)
        var updatedFavArray = {$set: {favourites: users.favourites} };
        await User.findByIdAndUpdate(userId, updatedFavArray)
        res.status(200).send({
            message: 'Property added to Favourites Successfully'
        })
    } catch (e){
        res.status(500).send({
            message: 'Error while adding property to favourites'
        })
    }
})

// Remove property from favourite by user
router.delete('/:id', async (req, res) => {
    console.log("Delete property to favourites by userid")
    var propertyId = req.query.propertyid;
    const userId = req.params.id;
    try{
        const users = await User.findById(userId)
        let updatedfavourites = users.favourites.filter(e => e !== propertyId)
        var updatedFavArray = {$set: {favourites: updatedfavourites} };
        await User.findByIdAndUpdate(userId, updatedFavArray)
        res.status(200).send({
            message: 'Property Removed from Favourites Successfully'
        })
    } catch (e){
        res.status(500).send({
            message: 'Error while removing property from favourites'
        })
    }
})

module.exports = router