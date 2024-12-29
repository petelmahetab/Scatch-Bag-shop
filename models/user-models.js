const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/scatch');

const userSchema=mongoose.Schema({
    fullname: String,        // Full name of the user (string)
  email: String,           // Email address (string)
  password: String,        // Password (string)
  cart: {
    type:Array,
    default:[]
  },             // List of items in the user's cart (array)   
  orders: {
    type:Array,
    default:[]
  },           // List of user orders (array)
  contact: Number,         // Contact number (string)
  picture: String
})

module.exports=mongoose.model('users',userSchema)