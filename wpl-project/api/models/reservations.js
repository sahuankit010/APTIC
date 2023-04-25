const mongoose = require('mongoose')

const paymentDetailsSchema = new mongoose.Schema({
    cardNumber: {
        type: Number,
        required: true,
        default: true
    },
    expdate: {
        type: String,
        required: true,
        default: true
    },
    cvv: {
        type: Number,
        required: true,
        default: true
    },
    cardholderName: {
        type: String,
        required: true,
        default: true
    },
    zipcode: {
        type: Number,
        required: true,
        default: true
    }
})

const reservationsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    propertyId: {
        type: String,
        required: true,
        trim: true
    },
    checkin: {
        type: String,
        required: true,
        trim: true
    },
    checkout: {
        type: String,
        required: true,
        trim: true
    },
    guests: {
        type: Number,
        required: true,
        trim: true
    },
    totalPrice: {
        type: Number,
        required: true,
        trim: true
    },
    paymentDetails: {
        type: paymentDetailsSchema,
        required: true,
        trim: true
    }
},
{
    timestamps: true
})

const Reservation = mongoose.model('Reservation', reservationsSchema)

module.exports = Reservation