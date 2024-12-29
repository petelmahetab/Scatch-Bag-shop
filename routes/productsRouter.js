const express=require('express')
const router=express.Router();
const upload=require('../config/multer-config')
const productModel=require('../models/product-models')
 

router.post('/create',upload.single("image"),async function (req,res){
  try{
    let { name,price,discount,bgcolor,panelcolor,textcolor}=req.body
   let products= await  productModel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    });
     
    req.flash('success','Product created Successfully.')
    res.redirect('/admin') 
  } catch(err){
    res.send(err.message)
  }
    //After that we are able to save to all record into database right .do it like this. 


    // res.send(req.file)  //we get data directly req.file is mendatory to put 'multipart/form-data'
    // //At this file our file save only in memory and not in databse for that we need to implement using Product_SCHEMA 
})

module.exports=router