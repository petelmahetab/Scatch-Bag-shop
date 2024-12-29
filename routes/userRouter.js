const express = require('express')
const router = express.Router();
const {registerUser,loginUser,logOut}=require('../controllers/authController')
const Product = require('../models/product-models');
const productModels = require('../models/product-models');

router.get('/', (req, res) => {
    const userLoggedIn=req.cookies.token?true:false;
    res.render("index",{userLoggedIn})
})

router.post('/register',registerUser);

router.post('/login',loginUser); 

router.get('/shop', async (req, res) => {
    try {
        const products = await Product.find({});
        const userLoggedIn = req.cookies.token ? true : false;
        res.render("shop", { products, userLoggedIn });
    } catch (error) {
        res.status(500).send("Error fetching products");
    }
});


router.get('/logout',logOut);


module.exports = router