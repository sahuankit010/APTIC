const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        default: true
    },
    city: {
        type: String,
        required: true,
        default: true
    },
    state: {
        type: String,
        required: true,
        default: true
    },
    zip: {
        type: Number,
        required: true,
        default: true
    }
})

const bankDetailsSchema = new mongoose.Schema({
    accountName: {
        type: String,
        required: true,
        default: true
    },
    bankName: {
        type: String,
        required: true,
        default: true
    },
    accountNumber: {
        type: Number,
        required: true,
        default: true
    },
    routingNumber: {
        type: Number,
        required: true,
        default: true
    }
})

const hostSchema = new mongoose.Schema({
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
    contact:{
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: addressSchema,
        required: true,
    },
    dob: {
        type: String,
        required: true,
        default: true
    },
    bankDetails: {
        type: bankDetailsSchema,
        required: true,
    }
},
{
    timestamps: true
})

const Host = mongoose.model('Host', hostSchema)

module.exports = Host
