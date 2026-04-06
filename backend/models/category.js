const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    
    categoryName:{
        type:String,
        required:true,
    },
    categoryImage:{
        type:String,
        required:true,
    },
    categoryAllProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },      
    ],
},{timestamps:true});

module.exports = mongoose.model("Category",categorySchema);