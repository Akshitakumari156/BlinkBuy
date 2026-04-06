import React, { useEffect, useRef, useState } from 'react'
import aiLogo from "../assets/gemini-color.png";
import { RxCross2 } from "react-icons/rx";
import { BsSend } from "react-icons/bs";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ChatboatModal = ({setChatboat}) => {

    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const [allMessages,setAllMessages] = useState([]);
    const {token}  = useSelector((state)=> state.auth);

    const messageRef = useRef();

    const submitHandler = async(e)=>{
        e.preventDefault();

        if(!message){
            return ;
        }

        setAllMessages([...allMessages,{
           role:"user",
           content:message,
        }])

        const data = {
            allMessages:[...allMessages,{
           role:"user",
           content:message,
        }]
        }
        
     try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/aiChatboat`,
          data,{
            headers:{
                Authorization:'Bearer '+token,
            }
          }
        );

        if(!response?.data?.success){
            throw new Error("Error occur during ai chatboat message");
        }

        setAllMessages([...allMessages,{
           role:"user",
           content:message,
        },{
           role:"assistant",
           content:response?.data?.response,
        }])

        console.log("response",response);
        setMessage("");
        setLoading(false);
        
     } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong"); 
     }
    }

   const srollHandler  = ()=>{
    
    messageRef?.current?.scrollIntoView({behavior:"smooth"})

   }

   useEffect(()=>{
    srollHandler();
   },[allMessages]);
    

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
        <div className='bg-gray-800 h-[80vh] w-[70vw] rounded-3xl'>

            {/* top div  */}
           <div className='px-6 py-2 flex justify-between items-center h-[10%] border-b-[1px] border-gray-600'>
              <div className='flex flex-row gap-2 items-center'>
                 <img src={aiLogo} alt="aiLogoImage"
               className='h-8 object-cover' />
               <p className='font-semibold text-xl'>SmartX Bot</p>
              </div>
               <RxCross2 size={30} className="cursor-pointer"
               onClick={()=>{setChatboat(false)}}/>
           </div>


           {/* messages  */}
           <div className='h-[80%] flex flex-col gap-2 p-2 w-full overflow-y-auto'>
             {
                allMessages.map((msg,index)=>{
                    return <div key={index} 
                    className={`${msg?.role === "user" ? "self-end bg-gray-950 px-2 py-1 rounded-md max-w-[30%]" 
                        : "self-start bg-gray-600 px-2 py-1 rounded-md max-w-[70%]"}
                    `}>
                        {
                            msg.content
                        }
                    </div>
                })
             }

             <div ref={messageRef}></div>
           </div>


           {/* input field */}
           <div className='h-[10%] border-t-[1px] border-gray-600'>
              
              <form className='px-4  h-full flex items-center justify-center'
              onSubmit={submitHandler}>
                <input type="text"
                className='w-full bg-gray-700 rounded-full py-2 px-2 border-none outline-none' 
                placeholder='Enter message...'
                value={message}
                onChange={(e)=>{setMessage(e.target.value)}}/>
                <button disabled={loading}  type="submit" 
                className={`-ml-10 ${loading ? "animate-spin" : ""}`}><BsSend size={23}/></button>
              </form>

           </div>
        </div>
    </div>
  )
}

export default ChatboatModal