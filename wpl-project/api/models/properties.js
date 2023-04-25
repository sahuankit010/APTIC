const mongoose = require('mongoose')
const validator = require('validator')

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: false,
        // default: new Date()
    },
    ratings: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
})

const reviewsSchema = new mongoose.Schema({
    stars: {
        type: Number,
        required: true,
        default: 0
    },
    totalReviews: {
        type: Number,
        required: true,
        default: 0
    },
    review:[{
        type: reviewSchema,
        required: false,
        trim: true
    }],
})

const propertySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category:[{
        type: String,
        required: false,
        trim: true
    }],
    shortDescription: {
        type: String,
        required: true,
        trim: true
    },
    fullDescription: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    },
    isAvailable:{
        type: String,
        default: "Active",
        required: false,
    },
    hostMessage: {
        type: String,
        required: true,
        trim: true
    },
    nightlyFee: {
        type: Number,
        required: true,
        trim: true
    },
    cleaningFee: {
        type: Number,
        required: true,
        trim: true
    },
    serviceFee: {
        type: Number,
        required: true,
        trim: true
    },
    guests: {
        type: Number,
        required: true,
        trim: true
    },
    bedrooms: {
        type: Number,
        required: true,
        trim: true
    },
    beds: {
        type: Number,
        required: true,
        trim: true
    },
    baths: {
        type: Number,
        required: true,
        trim: true
    },
    images:[{
        type: String,
        required: false,
        trim: true
    }],
    thumbnail: {
        type: String,
        required: false,
        trim: true,
        default: "default_thumbnail.jpg"
    },
    amenities:[{
        type: String,
        required: false,
        trim: true
    }],
    reviews:{
        type: reviewsSchema,
        required: false,
    },
    houseRules:[{
        type: String,
        required: false,
        trim: true
    }],
    healthAndSafety:[{
        type: String,
        required: false,
        trim: true
    }],
    cancellationPolicy:{
        type: String,
        required: false,
        trim: true
    }
},
{
    timestamps: true
})

const Property = mongoose.model('Property', propertySchema)
module.exports = Property
