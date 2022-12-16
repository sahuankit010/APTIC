const express = require('express')
const Reservations = require('../models/reservations')
const User = require('../models/users')
const Properties = require('../models/properties')
const router = new express.Router()


router.post('/', async (req, res) => {
    console.log(req.body)
    const reservations = new Reservations(req.body)
    try {
        console.log(reservations)
        await reservations.save()
        res.status(201).send(reservations)
    } catch (e) {
        res.status(400).send(e)
        console.log("Error")
    }
})


router.get('/:id', async (req, res) => {
    try {
        console.log("reservations by id")
        const reservations = await Reservations.findById(req.params.id)
        if (!reservations) return res.status(400).send({ 'error': 'Unable to fetch reservation data!' })
        res.send(reservations)
    } catch (e) {
        res.status(400).send({
            error: 'Error fetching reservation data'
        })
    }
})

router.get('/', async (req, res) => {
    var val = req.query;
    try {
        if (Object.keys(val).length == 0) {
            console.log("reservations")
            const reservations = await Reservations.find()
            res.send(reservations)
        } else {
            console.log(req.query)
            console.log(val.userid)
            const reservations = await Reservations.find({userId: val.userid})
            // console.log(reservations)
            if(!reservations) return res.status(400).send({'error': 'Unable to fetch reservation data for provided userId!'})
            
            var userReservations = JSON.parse('[]');
            for (i = 0; i < reservations.length; i++) {
                const propertyId = reservations[i].propertyId
                const property = await Properties.findById(propertyId)
                console.log(property)
                userReservations.push({_id: reservations[i]._id,
                                propertyId: property._id,
                                title: property.title,
                                city: property.city,
                                state: property.state,
                                country: property.country,
                                location: property.location,
                                checkin: reservations[i].checkin,
                                checkout: reservations[i].checkout })
            }
            console.log(userReservations)

            if(!userReservations) return res.status(400).send({'error': 'Unable to fetch reservation data!'})
            res.send(userReservations)
        }
    } catch (e) {
        res.status(400).send({
            error: 'Error fetching reservation data for provided userId!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Reservations.findByIdAndRemove(id)
        res.status(200).send({
            message: 'Reservation Deleted Successfully'
        })
    } catch (e) {
        res.status(500).send({
            message: 'Error while deleting reservation'
        })
    }
})

module.exports = router