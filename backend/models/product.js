const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    condition:{
        type:String,
        enum:["New","Used"],
        default:"Used",
    },
    location:{
        type:String,
         required:true,
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    images:[
        {
            url:{
                type:String,
                required:true,
            },
            public_id:{
                type:String,
                required:true,
            }
        }
    ],

    isAvaillable:{
        type:Boolean,
        default:true,
    },

},{timestamps:true});

module.exports = mongoose.model("Product",productSchema);