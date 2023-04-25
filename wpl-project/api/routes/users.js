const express = require('express')
const User = require('../models/users')
const Properties = require('../models/properties')
const router = new express.Router()
const UserAuth = require('../middleware/UserAuth')


router.post('/', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    try{
        console.log(user)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch(e){
        res.status(400).send(e)
        console.log("Error" + e)
    }
})

router.post('/login', async (req, res) => {
    try{
        console.log(req.body)
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e){
        console.log(e)
        res.status(400).send("error" + e)
    }
})

router.post('/logout', UserAuth, async (req, res) => {
    try{
        // console.log(req.body)
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e) {
        console.log(e)
        res.status(500).send("Error" + e)
    }
})

router.get('/', async (req, res) => {
    console.log("users")
    const users = await User.find()
    //res.send(req.users)
    res.send(users)
})

router.get('/:id', async (req, res) => {
    try {
    console.log("users by id")
    const users = await User.findById(req.params.id)
    if(!users) return res.status(400).send({'error': 'Unable to fetch user data!'})
    //res.send(req.users)
    res.send(users)
    } catch(e) {
        res.status(400).send({
            error: 'Error fetching user data'
        })
    }
})

// router.get('/:id/favourites', async (req, res) => {
//     try {
//     console.log("users by id")
//     const users = await User.findById(req.params.id)
//     const favourites = users.favourites;
//     var favouriteProperties = JSON.parse("[]");
//     for (i = 0; i < favourites.length; i++) {
//         const favouriteProperty = await Properties.findById(favourites[i])
//         favouriteProperties.push(favouriteProperty)
//     }
//     console.log(favouriteProperties)
//     if(!favouriteProperties) return res.status(400).send({'error': 'Unable to fetch user\'s favourite properties!'})
//     res.send(favouriteProperties)
//     } catch(e) {
//         res.status(400).send({
//             error: 'Error fetching user\'s favourite properties!'
//         })
//     }
// })

// router.patch('/users/me', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update=>allowedUpdates.includes(update)))
//     if(!isValidOperation) return res.status(400).send({'error': 'Invalid updates!'})

//     try{
//         updates.forEach((update) => req.user[update] = req.body[update])
//         await req.user.save()
//         res.send(req.user)
//     } catch(e){
//         res.status(400).send(e)
//     }
// })

module.exports = router