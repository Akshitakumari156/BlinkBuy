const mongoose = require("mongoose");
const dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{console.log("DB Connected successfully");
    })
    .catch((error)=>{
        console.log(error);
        console.log("DB connection failed");
        
    })

}
module.exports = dbConnect;