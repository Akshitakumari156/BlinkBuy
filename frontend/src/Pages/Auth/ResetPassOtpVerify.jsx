import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import OTPInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom'
import LogoAnimation from '../../components/Auth/LogoAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ResetPassOtpVerify = () => {

    const location = useLocation();    
    const userEmail = location.state;
    console.log("userEmail",userEmail);
    const [otp,setOtp] = useState("");
    const [loading,setLoading] = useState(false);
    const [otpLoading,setOtpLoading] = useState(false);
    const navigate = useNavigate();

    useGSAP(()=>{
      gsap.from(".otpAnimation",{
    x:-300,
    opacity:0,
    delay:0.6,
    duration:0.6,
      });

    });

     const resendOtpHandler = async()=>{  
           const tostId = toast.loading("sending otp...");
            try {
                setLoading(true);
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpforgotPassword`,{email:userEmail});
    
                if(!response?.data?.success){
                    throw new Error("Error occur during sending otp for reset password");
                }
    
                toast.dismiss(tostId);
                toast.success(response?.data?.message);
                setLoading(false);
                         
            } catch (error) {
                toast.dismiss(tostId);
                setLoading(false);
                toast.error(error.response?.data?.message || "Something went wrong");
            }
    
        }

    const otpVerifyHandler = async()=>{
        if(otp.length < 4){
            toast.error("Please fill the otp");
            return;
        }
        const tostId = toast.loading("Verifying otp...");
        try {
            setOtpLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/forgotPasswordOtpVerifiy`,{
                email:userEmail,
                otp:otp
            });

            if(!response?.data?.success){
                throw new Error("Error occur during verifying otp for reset password")
            }

            toast.dismiss(tostId);
            navigate("/reset-password",{state:{
                email:userEmail,
            }});
            toast.success(response?.data?.message);
            setOtpLoading(false);
            
        } catch (error) {
            console.log(error);
            setOtpLoading(false);
            toast.dismiss(tostId);
            toast.error(error.response?.data?.message || "Something went wrong");
            
            
        }
    }

  return (
   <div className='flex flex-row w-[100%]'>

    {/* otp  */}
     <div className='flex items-center justify-center h-[calc(100vh-80px)] w-[50%] otpAnimation'>
     <div className='flex items-center justify-center flex-col gap-1 '>
           <h2 className='font-semibold text-2xl'>We sent you a  code</h2>
        <p>Please enter it below to verify your email</p>
        <p className='text-blue-600 text-xs'>
            {
               userEmail
            }
        </p>

        <div className='mt-6'>
            <OTPInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} 
      className='w-20 h-12 text-4xl text-center text-white bg-gray-600 border
      border-gray-400 rounded-md'/>}
    />
        </div>

        <div className='w-full mt-6'>
             <Button variant="contained"   size="large" fullWidth
             onClick={otpVerifyHandler}
         
                   sx={{textTransform:"none"}}
             >
                Verify Otp
                </Button>
                 {
            otpLoading &&  <i class="fa-solid fa-spinner animate-spin -ml-8"></i>
           }
        </div>

        <div>
            <p className='mt-3'>Don't get the code? <span 
            className="underline cursor-pointer ml-2" onClick={resendOtpHandler} >Resend code</span></p>
        </div>
     </div>

    </div>

    {/* logo animation */}
    <div className='w-[50%] flex items-center justify-center -ml-14'>
      <LogoAnimation/>
    </div>


   </div>
  )
}

export default ResetPassOtpVerify