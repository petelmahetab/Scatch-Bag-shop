const mongoose=require('mongoose');

const ownerSchema=mongoose.Schema({
    fullname:  {
        type:String,
        minLength:3,
        trim:true
      },        // Full name of the user (string)
  email: String,           // Email address (string)
  password: String,        // Password (string)
  products: {
    type:Array,
    default:[]
  },           // List of user Products created by OWNER (array)         // Contact number (string)
  picture: String,
  gstNum:String
})

module.exports=mongoose.model('owner',ownerSchema)