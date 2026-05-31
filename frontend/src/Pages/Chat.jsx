import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import { Button, TextField, Typography, IconButton } from "@mui/material";
import { IoArrowBack } from "react-icons/io5";
import toast from "react-hot-toast";

const Chat = () => {
  const { receiverId } = useParams();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [receiverName, setReceiverName] = useState("");
  
  // 🟢 Ref for auto-scrolling
  const scrollRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 1. Initialize Socket Connection
  useEffect(() => {
    if (userData?._id) {
      const newSocket = io(import.meta.env.VITE_SOCKET_BACKEND_URL, {
        query: { userId: userData._id },
      });
      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [userData]);

  // 2. Fetch Conversation History
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/findConversation/${receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          setMessages(response.data.conversation);
          if (response.data.receiverDetails) {
            setReceiverName(`${response.data.receiverDetails.firstName} ${response.data.receiverDetails.lastName}`);
          }
        }
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    if (receiverId) fetchMessages();
  }, [receiverId, token]);

  // 3. Listen for incoming Real-Time Messages
  useEffect(() => {
    if (socket) {
      const handleNewMessage = (message) => {
        if (message.senderId === receiverId || message.receiverId === receiverId) {
          setMessages((prev) => [...prev, message]);
        } else {
          toast.success("New message from someone else!");
        }
      };
      socket.on("new-message", handleNewMessage);
      return () => socket.off("new-message", handleNewMessage);
    }
  }, [socket, receiverId]);

  // 4. Send Message Function
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/sendMessage`,
        { receiverId, message: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setMessages((prev) => [...prev, response.data.newMessage]);
        setNewMessage("");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  return (
    /* 🟢 Change 1: Responsive container - full screen on mobile, capped on desktop */
    <div className="flex flex-col w-full lg:w-[70vw] xl:w-[60vw] mx-auto h-[calc(100vh-80px)] md:h-[85vh] md:mt-5 md:border border-gray-700 md:rounded-xl bg-gray-950 overflow-hidden shadow-2xl">
      
      {/* Header - 🟢 Change 2: Sticky Header with Back Button */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800 bg-gray-900 shadow-sm">
        <IconButton onClick={() => navigate(-1)} sx={{ color: "white" }}>
          <IoArrowBack />
        </IconButton>
        <div>
          <Typography variant="h6" className="text-white font-bold">
            {receiverName || "Chat"}
          </Typography>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-400">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Window - 🟢 Change 3: Optimized scrolling area */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
            <div className="p-4 bg-gray-900 rounded-full text-4xl">👋</div>
            <p className="text-gray-500">No messages yet. Send a "Hi" to start the conversation!</p>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === userData._id;
            return (
              <div 
                key={index} 
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div 
                  className={`px-4 py-2.5 rounded-2xl text-[15px] shadow-sm max-w-[80%] md:max-w-[60%] ${
                    isMe 
                      ? "bg-indigo-600 text-white rounded-br-none" 
                      : "bg-gray-800 text-gray-100 rounded-bl-none"
                  }`}
                >
                  {msg.message}
                </div>
                {/* 🟢 Optional: Timestamp placeholder */}
                <span className="text-[10px] text-gray-600 mt-1 px-1">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
        {/* Scroll Anchor */}
        <div ref={scrollRef} />
      </div>

      {/* Input Area - 🟢 Change 4: Fixed Bottom Input with better styling */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        <form onSubmit={sendMessageHandler} className="flex gap-2 items-center">
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            autoComplete="off"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                backgroundColor: '#111827',
                borderRadius: '24px',
                '& fieldset': { borderColor: '#374151' },
                '&:hover fieldset': { borderColor: '#4F46E5' },
              },
            }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disabled={!newMessage.trim()}
            sx={{ 
              borderRadius: "24px", 
              px: 3, 
              bgcolor: '#4F46E5', 
              '&:hover': { bgcolor: '#4338CA' },
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;