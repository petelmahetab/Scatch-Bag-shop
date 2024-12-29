const jwt=require('jsonwebtoken')
const userModel=require('../models/user-models')


module.exports=async function(req,res,next){
    //Agar request ne Token nahi hai toh redirect home pr aur FLASH karo....
    if(!req.cookies.token){
        req.flash('error','You need to Login first')
        return res.redirect('/')
    }

    //
    try{
        //decode karo token ko
        let decodedToken=jwt.verify(req.cookies.token,process.env.JWT_KEY);
        let user=await userModel.findOne({email:decodedToken.email}).select('-password'); //i don't the passsword filed form that oky...Iski wajah se meri password wali field nhi hogi select.
        req.user=user; //request me user ka data put kr diya.
        next();//move forward

    }catch(err){
        req.flash('error','Something went wrong.')
        return res.redirect('/')
    }
}