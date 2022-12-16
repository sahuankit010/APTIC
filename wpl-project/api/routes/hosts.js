const express = require('express')
const Host = require('../models/hosts')
const router = new express.Router()

router.post('/', async (req, res) => {
    console.log(req.body)
    const host = new Host(req.body)
    try{
        console.log(host)
        await host.save()
        // const token = await host.generateAuthToken()
        res.status(201).send(host)
    }catch(e){
        res.status(400).send(e)
        console.log("Error" + e)
    }
})

router.get('/', async (req, res) => {
    console.log("host")
    const host = await Host.find()
    //res.send(req.host)
    res.send(host)
})

router.get('/:id', async (req, res) => {
    try {
    console.log("hosts by id")
    const hosts = await Host.findById(req.params.id)
    if(!hosts) return res.status(400).send({'error': 'Unable to fetch host data!'})
    //res.send(req.hosts)
    res.send(hosts)
    } catch(e) {
        res.status(400).send({
            error: 'Error fetching host data'
        })
    }
})


module.exports = router