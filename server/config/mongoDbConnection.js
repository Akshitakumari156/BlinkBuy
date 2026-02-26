const mongoose = require("mongoose");
const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DB Connected successfully");
    })
    .catch((error)=>{
        console.log(error);
        console.log("DB connection failed");
        
    })

}
module.exports = dbConnect;