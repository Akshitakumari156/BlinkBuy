import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import OTPInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom'
import LogoAnimation from '../../components/Auth/LogoAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Otp = () => {
    const location = useLocation();
    const formData = location?.state?.Data;
    const [otp,setOtp] = useState("");
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    //  resend otp 
     const resendOtpHandler = async()=>{

      const data = {
        email:formData?.email,
      }
    
        const toastId = toast.loading("sending otp...");
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`,data);
         if(!response.data.success){
    
             throw new Error("Error occur during signUp");
        }
    
        toast.dismiss(toastId);
        toast.success(response.data.message);
        
      } catch (error) {
        toast.dismiss(toastId);
        toast.error(error.response?.data?.message || "Something went wrong");
        console.log(error);
        }
    
      
     }

    //  verify Otp
     if (!formData?.email) {
  navigate("/");
  return null;
}
    const verifyOtpHandler = async()=>{
      if(otp.length < 4){
        toast.error("Please fill the otp");
        return;
      }

      formData.otp = otp;

      const tostId = toast.loading("Verifying opt...");
      try {
        setLoading(true);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`,formData);

        if(!response?.data?.success){
          throw new Error("Error occur during verfiying otp");
        }

        toast.dismiss(tostId);
        toast.success(response?.data?.message);
        setLoading(false);
        navigate("/login");
        
      } catch (error) {
        console.log(error);
        toast.dismiss(tostId);
        toast.error(error.response?.data?.message);
        setLoading(false);   
      }

  
      
    }

    useGSAP(()=>{
      gsap.from(".otpAnimation",{
    x:-300,
    opacity:0,
    delay:0.6,
    duration:0.6,
      });

    });



  return (
   <div className='flex flex-row'>

    {/* otp  */}
     <div className='flex items-center justify-center h-[100vh] w-[50%] otpAnimation'>
     <div className='flex items-center justify-center flex-col gap-1 '>
           <h2 className='font-semibold text-2xl'>We sent you a  code</h2>
        <p>Please enter it below to verify your email</p>
        <p className='text-blue-600 text-xs'>
            {
                formData.email
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
             <Button variant="contained"  size="large" fullWidth
             onClick={verifyOtpHandler}
             disabled={loading}
                   sx={{textTransform:"none"}}
             >
                Verify Otp
                </Button>
                 {
            loading &&  <i class="fa-solid fa-spinner animate-spin -ml-8"></i>
           }
        </div>

        <div>
            <p className='mt-3'>Don't get the code? <span 
            className="underline cursor-pointer ml-2" onClick={resendOtpHandler}>Resend code</span></p>
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

export default Otp