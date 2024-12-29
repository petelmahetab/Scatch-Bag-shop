const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  const error = [];  // or some logic to populate the error array
  res.render('index', { error: error });
});


module.exports = router;
