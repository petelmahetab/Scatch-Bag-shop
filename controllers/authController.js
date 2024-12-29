const userModel = require('../models/user-models');
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {generateToken}=require('../utils/generateToken');
const { use } = require('../routes/ownersRouter');

module.exports.registerUser= async function (req, res) {

    //yeh directly routes create ke degi new user and apne ko kuch verfication lagani padegi
    //check karo ki agar woh registerd kiya hua already hai DB me toh osko Fir se register karne nhi denge
    try {
        let { email, password, fullname } = req.body;

        //Find karenge eamil ke basis pe ki woh hai kya
        let user= await userModel.findOne({email:email})
        //agar user mila or email hai already toh return
        if(user) return res.status(401).send('You already have an account. Please Log In')
         
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, ha) {
                if (err) res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password:ha, //Hashed password right
                        fullname
                    });
                    //res.send(user);

   //Now setup json webtoken joh hame future me chahiye woh idhr kar sakte ho right 
   //Ager kisi ne Email set kiya token me joh BROWSER me set hoga ,aur future me koi bhi Request aayegi toh saat me yehi
   //token aayega saat me.   Aur hum jabhi osi token o decode karenge we will get Original email was setted in from the UI.
  //idhr hame woh set karna padega  jisko Decode karne ke baad user ke BARE me INFORMATION Mile
  //same as Filed name right 
                    let token=generateToken(user)
                    res.cookie('token',token)  //iski wajah se jis ne register karne ki koshish kari hai oske Browser pr set ho jayegi.
                    res.send("User Created Successfully")
                }
            })
        })



    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error creating user");
    }
}

module.exports.loginUser = async function (req, res) {
    // Get email and password from the request body
    let { email, password } = req.body;

    // Find user by email in the database
    let userFound = await userModel.findOne({ email: email });

    // If user not found, send error
    if (!userFound) {
        return res.status(401).send('Email or Password Incorrect');
    }

    // Compare the entered password with the hashed password in the database //Agar Emaila nd password same hua toh is me jaYEgA...
    bcrypt.compare(password, userFound.password, function (err, matched) {
        //we need to set up the Generate token to user agar user email and password
        if(matched){
            let token=generateToken(userFound)//token generate karo mile wale user se...
            res.cookie("token",token)
            res.send('Now You can login')
        }else{
            return res.status(401).send('Email or Password Incorrect');
        }
        
    });
};

// 