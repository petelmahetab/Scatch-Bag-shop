const express=require('express')
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Welcome Owners')
})

module.exports=router