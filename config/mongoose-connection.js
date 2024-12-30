const mongoose=require('mongoose');
const cofig=require('config')
const dbgr=require('debug')('development:mongoose');

const getUrl=cofig.MONGODB_URL;

mongoose.connect(`${getUrl}/scatch`)
.then(function(){dbgr("Connected")})
.catch(function(err){
    console.log(err);
});

module.exports=mongoose.connection //For controll entire DATABASE.