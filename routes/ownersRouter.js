const express=require('express')
const router=express.Router();
const ownerModel=require('../models/owner-models');


router.get('/',(req,res)=>{
    res.send('Welcome Owners')
})

console.log(process.env.NODE_ENV === 'development')
console.log("Kuch ni hua aage badh tu BILLIONAIRE abhi se....")


//checking If Envirnoment will be Development then only this route will bw works other wise not.for secure the  COMPROMISE this 
if (process.env.NODE_ENV === 'development') {
  router.post('/create', async (req, res) => {
    // Step 1: Check if there are existing owners
    const owners = await ownerModel.find();
    console.log(owners)
    if (owners.length > 0) {
      return res.status(504)
      .send('You should not be able to create an Owner');
  }

    // Step 3: If no owners exist, proceed with creating the new owner
    const { fullname, email, password } = req.body;
    const createdOwner = await ownerModel.create({ fullname, email, password });

    // Step 4: Send a success response
    res.status(200).send('Owner created successfully');
});
}
module.exports=router
