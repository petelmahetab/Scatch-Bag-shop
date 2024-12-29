const express = require('express')
const router = express.Router();
const {registerUser,loginUser}=require("../controllers/authController")


router.get('/', (req, res) => {
    const userLoggedIn=req.cookies.token?true:false;
    res.render("index",{userLoggedIn})
})

router.post('/register',registerUser);

router.post('/login',loginUser); 



module.exports = router