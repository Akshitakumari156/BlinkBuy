const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");


const server = http.createServer(app);

const io = new socketIo.Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true,
    }
});

  const allOnlineUsers = {};

// io.on("connection",(socket)=>{

//     const userId = socket.handshake.query.userId;

//     if(userId !== undefined){
//         allOnlineUsers[userId] = socket.id;
//         io.emit("all-online-users",Object.keys(allOnlineUsers));
//     }
    
//     socket.on("disconnect",()=>{
//       delete allOnlineUsers[userId];
//       io.emit("all-online-users",Object.keys(allOnlineUsers));
//     })
     
      
// });
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    
    // ADD THESE TWO LOGS:
    console.log(`🔌 New connection attempt. User ID from frontend: ${userId}`);

    if (userId !== undefined && userId !== "undefined" && userId !== null) {
        allOnlineUsers[userId] = socket.id;
        io.emit("all-online-users", Object.keys(allOnlineUsers));
    }
    
    // ADD THIS LOG:
    console.log("📖 Current Address Book (allOnlineUsers):", allOnlineUsers);
    
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${userId}`);
      delete allOnlineUsers[userId];
      io.emit("all-online-users", Object.keys(allOnlineUsers));
    });
});
const getReceiverSocketId = (receiverId)=>{
    return allOnlineUsers[receiverId];
  }
module.exports = {app,server,io,getReceiverSocketId};