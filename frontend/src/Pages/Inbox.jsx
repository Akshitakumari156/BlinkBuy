import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Skeleton } from "@mui/material";
import { FaChevronRight } from "react-icons/fa";

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/chatUsers`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          setConversations(response.data.allUsers);
        }
      } catch (error) {
        console.error("Failed to fetch conversations");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchChatUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] py-10 px-4 md:px-10">
      {/* Container - Responsive width */}
      <div className="w-full lg:w-[60vw] mx-auto p-4 md:p-8 bg-[#12121A] border border-gray-800 rounded-2xl shadow-2xl">
        <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-6">
          <div>
            <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
              My Messages
            </Typography>
            <p className="text-gray-500 text-sm mt-1">Chat with buyers and sellers</p>
          </div>
          <div className="bg-indigo-500/10 text-indigo-500 px-4 py-1 rounded-full text-sm font-semibold">
            {conversations.length} Active
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            // 🟢 Skeleton Loading State
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 bg-gray-800/50 rounded-xl flex gap-4 items-center">
                <Skeleton variant="circular" width={48} height={48} sx={{ bgcolor: 'grey.900' }} />
                <div className="flex-1">
                  <Skeleton variant="text" width="40%" sx={{ bgcolor: 'grey.900' }} />
                  <Skeleton variant="text" width="20%" sx={{ bgcolor: 'grey.900' }} />
                </div>
              </div>
            ))
          ) : conversations.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/50 rounded-xl border border-dashed border-gray-800">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-gray-400 text-lg">No messages yet.</p>
              <p className="text-gray-600 text-sm">When you contact a seller, your chat will appear here.</p>
            </div>
          ) : (
            conversations.map((conv, index) => {
              // 🟢 Robust handling for finding the other user
              const otherUser = conv.members?.find(member => member._id !== userData?._id);

              if (!otherUser) return null;

              return (
                <div
                  key={conv._id || index}
                  onClick={() => navigate(`/chat/${otherUser._id}`)}
                  className="group p-4 border border-gray-800 rounded-xl bg-[#0B0B0F] flex items-center justify-between gap-4 cursor-pointer hover:border-indigo-500/50 hover:bg-gray-800/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar with Status Dot */}
                    <div className="relative">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
                        {otherUser?.firstName?.charAt(0) || "?"}
                      </div>
                      <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full bg-green-500 border-2 border-[#0B0B0F]"></span>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="text-white text-lg font-semibold group-hover:text-indigo-400 transition-colors">
                        {otherUser?.firstName} {otherUser?.lastName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-500 text-sm truncate max-w-[150px] md:max-w-xs">
                          {conv.lastMessage || "Click to start chatting..."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Only: Right Arrow */}
                  <div className="hidden md:block text-gray-700 group-hover:text-indigo-500 transition-colors">
                    <FaChevronRight />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;