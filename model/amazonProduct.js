
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id : String,
    brand: String,
    name: String,     
    price: String,
    rating: String,
    image: String,
    link: String
},{
    timestamps : true
})

const productlist = mongoose.model('amazondata', productSchema);
module.exports = productlist;