const mongoose = require("mongoose");

const coversationSchema = new mongoose.Schema({
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    allMessages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        },
    ]
},{timestamps:true});

module.exports = mongoose.model("Conversation",coversationSchema);