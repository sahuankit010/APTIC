const jwt = require('jsonwebtoken')
const User = require('../models/users')

const UserAuth = async (req, res, next) => {
    try{
        // console.log(req)
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'cs6314wpl')
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})

        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch(e) {
        res.status(401).send({error: 'Please authenticate'})
    }
}

module.exports = UserAuth
