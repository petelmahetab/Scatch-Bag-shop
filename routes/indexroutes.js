const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedIn')
const productModel = require('../models/product-models');
const userModels = require('../models/user-models');
const flash=require('connect-flash')


router.get('/', function (req, res) {
  const error = req.flash('error')  // Or some logic to populate the error array
  res.render('index', { error ,loggedIn:false});
});

router.get('/shop', isloggedin, async function (req, res) {
  try {
      const products = await productModel.find();
     
      res.render('shop', { products });
  } catch (error) {
      console.error('Error fetching products:', error);
      req.flash('error', 'Failed to load products.');
      res.redirect('/');
  }
});


router.get('/addtocart/:productid', isloggedin, async function (req, res) {
  try {
    const productId = req.params.productid;
    console.log('Product ID to add:', productId); // Debugging: Check the product ID

    // Find the logged-in user
    const user = await userModels.findOne({ email: req.user.email });
    if (!user) {
      req.flash('error', 'User not found.');
      return res.redirect('/shop');
    }

    // Add the product ID to the user's cart
      //else add the productID to cart ,cart array contains for inserting we use the push
    user.cart.push(productId);
    await user.save();

    req.flash('success', 'Product added to cart !');
    res.redirect('/shop');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    req.flash('error', 'Failed to add product to cart.');
    res.redirect('/shop');
  }
  // console.log('Product ID:', req.params.productid); // Product ID लॉग करें
  // res.send('Route is working!');
});



router.get('/cart', isloggedin, async function (req, res) {
    //User LoggedIn then we need to get the user from then database and Populate 
      const user=await userModels.findOne({email:req.user.email}).populate('cart')
      let products=user.cart;
      res.render('cart',{user,products} );

});


router.post('/cart/remove/:productId', isloggedin, async (req, res) => {
  const productId = req.params.productId;
  const user = await userModels.findOne({ email: req.user.email });

  // Remove the product from the cart
  user.cart = user.cart.filter(product => product._id.toString() !== productId);

  // Save the updated user document
  await user.save();

  // Redirect back to the cart page
  res.redirect('/cart');
});


module.exports = router;
