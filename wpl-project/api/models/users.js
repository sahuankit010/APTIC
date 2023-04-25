const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    hostId: {
        type: String,
        required: false,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Invalid Email')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length<=6)
                throw new Error('Password ' + value + ' length is not more than 6.')
            if(value.includes('password'))
                throw new Error('Your Password includes the word password.')
        }
    },
    contact:{
        type: String,
        required: false,
        trim: true
    },
    dob: {
        type: String,
        required: false,
    },
    isHost: {
        type : Boolean,
        required: true,
        default: false
    },
    // propertyHosted:[{
    //     type: String,
    //     required: false, 
    //     trim: true
    // }],
    favourites:[{
        type: String,
        required: false, 
        trim: true
    }],
    tokens: [{
        token : {
            type: String,
            required: true
        }
    }],
},
{
    timestamps: true
})

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'cs6314wpl')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) throw new Error('Unable to login!')
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) throw new Error('Unable to login!')   
    return user
}

userSchema.pre('save', async function(next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
// Delete user tasks when user is removed
// userSchema.pre('remove', async function(next) {
//     const user = this
//     await Tasks.deleteMany({owner: user._id})
//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User