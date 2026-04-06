const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");


const server = http.createServer(app);

const io = new socketIo.Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
    }
});

  const allOnlineUsers = {};

  const getReceiverSocketId = (receiverId)=>{
    return allOnlineUsers[receiverId];
  }

io.on("connection",(socket)=>{

    const userId = socket.handshake.query.userId;

    if(userId !== undefined){
        allOnlineUsers[userId] = socket.id;
        io.emit("all-online-users",Object.keys(allOnlineUsers));
    }
    
    socket.on("disconnect",()=>{
      delete allOnlineUsers[userId];
      io.emit("all-online-users",Object.keys(allOnlineUsers));
    })
     
      
});

module.exports = {app,server,io,getReceiverSocketId};