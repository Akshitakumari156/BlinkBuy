const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { getReceiverSocketId, io } = require("../socket/socket");


// send message
exports.sendMessage = async(req,res)=>{
    try {
        // fetch data
        const {receiverId,message} = req.body;

        const senderId = req.user.userId;

        // validation
        if(!receiverId || !senderId || !message){
            return res.status(400).json({
                success:false,
                message:"Something went wrong during fetch data",
            })
        }

        if(receiverId === senderId){
            return res.status(400).json({
                success:false,
                message:"Both id's will be same",
            })
        }

        // find conversation
        let conversation = await Conversation.findOne({
            members:{$all:[receiverId,senderId]}
        });

        if(!conversation){

            // create conversation 
            conversation = await Conversation.create({
                members:[senderId,receiverId],
            })
        }
          
        // create new message
        const newMessage = new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message,
        });

        if(newMessage){
            conversation.allMessages.push(newMessage);
        }

       await Promise.all([newMessage.save(),conversation.save()]);

       // socket.io implement
       const receiverSocketId = getReceiverSocketId(receiverId);

       if(receiverSocketId){
        io.to(receiverSocketId).emit("new-message",newMessage);
       }

       // return response
       return res.status(200).json({
        success:true,
        message:"Message send successfully",
        newMessage:newMessage,
        conversation:conversation,
       })
        
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"Internal Server error",
      })
        
    }
}

// find conversation 
exports.findConversation = async(req,res)=>{
      try {
        // fetch data
        const {receiverId} = req.params;

        const senderId = req.user.userId;

        // validation
        if(!receiverId || !senderId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong during fetching id's",
            })
        }

           if(receiverId === senderId){
            return res.status(400).json({
                success:false,
                message:"Both id's will be same",
            })
        }

        // find conversation
        const conversation = await Conversation.findOne({
            members:{$all:[senderId,receiverId]}
        }).populate("members","-password").populate("allMessages").exec();

        console.log("conversation",conversation);
        

        // return response
        return res.status(200).json({
            success:true,
            message:"Conversation find successfully",
            conversation:conversation === null ? [] : conversation.allMessages,
        })
        
      } catch (error) {
       console.log(error);
       return res.status(500).json({
        success:false,
        message:"Internal Server error",
       })
        
      }
}

// find all chat users
exports.chatUsers =  async(req,res)=>{
    try {
        // fetch currentUserId
        const userId = req.user.userId;

        // validation
        if(!userId){
            return res.status(400).json({
                success:false,
                message:"Something went wrong during fetching userId",
            })
        }

        // find all users
        const allUsers = await Conversation.find({
            members:{$in:[userId]}
        }).populate("members","-password");

        // return response
        return res.status(200).json({
            success:true,
            message:"Successfully fetch all users",
            allUsers:allUsers,
        })
        
    } catch (error) {
     console.log(error);
     return res.status(500).json({
        success:false,
        message:"Internal Server error",
     })
        
    }
}