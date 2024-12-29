const express = require('express');
const router = express.Router();
const isloggedin = require('../middlewares/isLoggedIn')
const productModel = require('../models/product-models')

router.get('/', function (req, res) {
  const error = req.flash('error')  // Or some logic to populate the error array
  res.render('index', { error });
});

router.get('/shop', isloggedin, async function (req, res) {
  try {
      const products = await productModel.find();
      console.log('Products fetched from database:', products);
      res.render('shop', { products });
  } catch (error) {
      console.error('Error fetching products:', error);
      req.flash('error', 'Failed to load products.');
      res.redirect('/');
  }
});

module.exports = router;
