const express = require('express')
const Properties = require('../models/properties')
const router = new express.Router()


router.post('/', async (req, res) => {
    console.log("Add property by property id")
    console.log(req.body)
    const properties = new Properties(req.body)
    try {
        console.log(properties)
        await properties.save()
        res.status(201).send(properties)
    } catch (e) {
        res.status(400).send(e)
        console.log("Error")
    }
})

router.get('/', async (req, res) => {
    var val = req.query;
    console.log(val)
    try {
        if (Object.keys(val).length == 0) {
            console.log("get all properties")
            const properties = await Properties.find()
            res.send(properties)
        } else {
            console.log("get properties by userid")
            console.log(req.query)
            console.log(val.userid)
            const properties = await Properties.find({ userId: val.userid })
            if (!properties) return res.status(400).send({ 'error': 'No properties hosted by user' })
            res.send(properties)
        }
    } catch (e) {
        res.status(400).send({
            error: 'Error fetching proerties data for provided userId!'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        console.log("Fetch properties by id")
        const properties = await Properties.findById(req.params.id)
        if (!properties) return res.status(400).send({ 'error': 'Unable to fetch properties data!' })
        //res.send(req.properties)
        res.send(properties)
    } catch (e) {
        res.status(400).send({
            error: 'Error fetching properties data'
        })
    }
})

router.put('/:id', async (req, res) => {
    console.log("Update property by propertyid")
    if (!req.body) {
        return res.status(400).send({
            message: "Property Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    try {
        await Properties.findByIdAndUpdate(id, req.body)
        res.status(200).send({
            message: 'Property Updated Successfully'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Error while updating property'
        })
    }
})

// Add ratings/feedback to the property
router.put('/:id/review', async (req, res) => {
    console.log("Add review to property by propertyid")
    if (!req.body) {
        return res.status(400).send({
            message: "Property Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    try {
        const property = await Properties.findById(id)
        let review = property.reviews.review
        review = review.push(req.body)

        let totalReviews = property.reviews.totalReviews
        let stars = property.reviews.stars
        stars = (stars * totalReviews + req.body.ratings) / (totalReviews + 1)

        var updatedReview = {
            $set: {
                reviews: {
                    stars: stars.toFixed(2),
                    totalReviews: property.reviews.totalReviews + 1,
                    review: property.reviews.review
                }
            }
        };
        await Properties.findByIdAndUpdate(id, updatedReview)
        res.status(200).send({
            message: 'Property Review Added Successfully'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Error while adding property review'
        })
    }
})

router.delete('/:id', async (req, res) => {
    console.log("Delete property by propertyid")
    const id = req.params.id;
    var unavailable = { $set: { isAvailable: "Suspended" } };
    try {
        await Properties.findByIdAndUpdate(id, unavailable)
        res.status(200).send({
            message: 'Property Disabled Successfully'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Error while disabling property'
        })
    }
})


module.exports = router