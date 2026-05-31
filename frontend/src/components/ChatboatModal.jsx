import React, { useEffect, useRef, useState } from 'react';
import aiLogo from "../assets/gemini-color.png";
import { RxCross2 } from "react-icons/rx";
import { BsSend } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChatboatModal = ({ setChatboat }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const messageRef = useRef(null);

  // ✅ Auto Scroll (Original Logic)
  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allMessages]);

  // ✅ Send Message (Original Logic)
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const updatedMessages = [
      ...allMessages,
      { role: "user", content: message },
    ];

    setAllMessages(updatedMessages);
    setMessage("");

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/aiChatboat`,
        { allMessages: updatedMessages },
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );

      if (!response?.data?.success) {
        throw new Error("AI response failed");
      }

      setAllMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Overlay: Standardized padding for mobile */
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4'>

      {/* Modal Container: 
          Mobile: w-full, h-[90vh]
          Tablet: w-[80vw]
          PC: w-[450px] (Chatbots usually look better slim on PC)
      */}
      <div className='bg-gray-800 h-[85vh] md:h-[80vh] w-full sm:w-[80vw] md:w-[60vw] lg:w-[450px] rounded-3xl flex flex-col shadow-2xl overflow-hidden'>

        {/* Header */}
        <div className='px-4 md:px-6 py-4 flex justify-between items-center border-b border-gray-600 bg-gray-800 shrink-0'>
          <div className='flex gap-2 items-center'>
            <img src={aiLogo} alt="ai" className='h-6 md:h-8' />
            <p className='font-semibold text-lg md:text-xl text-white'>😉Buy Bot</p>
          </div>

          <RxCross2
            size={24}
            className="cursor-pointer text-white hover:text-gray-400 transition-colors"
            onClick={() => setChatboat(false)}
          />
        </div>

        {/* Messages: flex-1 ensures this area takes up available height */}
        <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-gray-800'>
          {allMessages.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-2xl text-white break-words text-sm md:text-base
                ${msg.role === "user"
                  ? "self-end bg-blue-600 rounded-tr-none max-w-[85%]"
                  : "self-start bg-gray-700 rounded-tl-none max-w-[85%]"
                }`}
            >
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className='self-start bg-gray-700 px-4 py-2 rounded-2xl rounded-tl-none text-white text-sm animate-pulse'>
              Typing...
            </div>
          )}
          <div ref={messageRef}></div>
        </div>

        {/* Input: Sticky at the bottom of the flex container */}
        <form
          onSubmit={submitHandler}
          className='p-4 border-t border-gray-600 flex gap-2 bg-gray-800 shrink-0'
        >
          <input
            type="text"
            placeholder='Ask anything...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            /* Responsive Input height/text */
            className='flex-1 bg-gray-700 text-white rounded-full px-4 py-2.5 text-sm md:text-base outline-none border border-transparent focus:border-blue-500 transition-all'
          />

          <button
            type="submit"
            disabled={loading}
            className='bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full disabled:opacity-50 transition-all shrink-0'
          >
            <BsSend size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default ChatboatModal;