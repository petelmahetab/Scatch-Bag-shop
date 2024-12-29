const multer = require('multer');
const storage = multer.memoryStorage(); //Setup the Data Memory Storage
const upload=multer({storage:storage}) //Bydefault all files upload here


module.exports=upload;