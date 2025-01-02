const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: Buffer,
    discount:{
type:Number,
default:0
    },
 
    bgcolor: String,
    panelcolor: String,
    textcolor: String
    // add other fields as needed
});

module.exports = mongoose.model('Product', productSchema);