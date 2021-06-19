const mongoose = require('mongoose')

/**
 * defining single schema for the product entity, to be persisted 
 * at the backend mongoDb
 */
const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    formatted_price: {
        type: String
    },
    formatted_msrp: {
        type: String
    },
    image_cover_url:{
        type: String
    },
    category_name: {
        type: String
    },
    country_origin: {
        type: String
    },
    shipping_exclusions: [{
        type: String
    }],
    premium: {
        type: Boolean
    },
    supplier_name:{
        type: String 
    }
})

const Product = mongoose.model('product',productSchema)

module.exports = Product