const mongoose=require('mongoose');


const productSchema=mongoose.Schema({
    image:String,           // URL of the product image (string)
  name: String,            // Name of the product (string)
  price: Number,             // Price of the product (number)
  discount:{
  type:Number,
  default:0
  } ,          // Discount on the product in percentage (number)
  bgcolor: String,         // Background color for the product card (string)
  panelColor: String,      // Color of the product's panel (string)
  textcolor: String
})

module.exports=mongoose.model('products',productSchema)