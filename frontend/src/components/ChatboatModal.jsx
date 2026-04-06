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

  // ✅ Auto Scroll
  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [allMessages]);



  // ✅ Send Message
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const updatedMessages = [
      ...allMessages,
      {
        role: "user",
        content: message,
      },
    ];

    setAllMessages(updatedMessages);
    setMessage("");

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/aiChatboat`,
        { allMessages: updatedMessages },
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );

      if (!response?.data?.success) {
        throw new Error("AI response failed");
      }

      setAllMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.response,
        },
      ]);

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>

      <div className='bg-gray-800 h-[80vh] w-[70vw] rounded-3xl flex flex-col'>

        {/* Header */}
        <div className='px-6 py-3 flex justify-between items-center border-b border-gray-600'>
          <div className='flex gap-2 items-center'>
            <img src={aiLogo} alt="ai" className='h-8' />
            <p className='font-semibold text-xl text-white'>SmartX Bot</p>
          </div>

          <RxCross2
            size={28}
            className="cursor-pointer text-white"
            onClick={() => setChatboat(false)}
          />
        </div>



        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-3'>

          {allMessages.map((msg, index) => (

            <div
              key={index}
              className={`px-3 py-2 rounded-xl text-white break-words
                ${msg.role === "user"
                  ? "self-end bg-gray-900 max-w-[60%]"
                  : "self-start bg-gray-600 max-w-[75%]"
                }`}
            >
              {msg.content}
            </div>

          ))}

          {loading && (
            <div className='self-start bg-gray-600 px-3 py-2 rounded-xl text-white'>
              Typing...
            </div>
          )}

          <div ref={messageRef}></div>

        </div>



        {/* Input */}
        <form
          onSubmit={submitHandler}
          className='p-3 border-t border-gray-600 flex gap-2'
        >

          <input
            type="text"
            placeholder='Enter message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='flex-1 bg-gray-700 text-white rounded-full px-4 py-2 outline-none'
          />

          <button
            disabled={loading}
            className='bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full disabled:opacity-50'
          >
            <BsSend size={18} />
          </button>

        </form>

      </div>
    </div>
  );
};

export default ChatboatModal;
