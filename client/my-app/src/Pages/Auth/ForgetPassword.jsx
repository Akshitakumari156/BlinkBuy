import React, { useState } from 'react'
import LogoAnimation from '../../components/Auth/LogoAnimation'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { CgMail } from "react-icons/cg";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const [loading,setLoading] = useState(false);

    useGSAP(()=>{
        const t1 = gsap.timeline();
        t1.from(".formAnimation",{
            x:-900,
            opacity:0,
         delay:0.3,
         duration:0.6,
        })

        t1.from(".formItem",{
            y:100,
            opacity:0,
              duration:0.3,
               stagger:0.2
        },"-=0.3")
    })

    const submitHandler = async(e)=>{
        e.preventDefault();
   
       const tostId = toast.loading("checking and processing...");
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpforgotPassword`,{email});

            if(!response?.data?.success){
                throw new Error("Error occur during sending otp for reset password");
            }

            toast.dismiss(tostId);
            toast.success(response?.data?.message)
            setLoading(false);
                     
        } catch (error) {
            toast.dismiss(tostId);
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");
        }

    }
  return (
    <div className='flex flex-row px-24 py-6  h-screen'>

        {/* forgot password form */}
        <div className='w-[50%]'>
          <Typography variant="h3" sx={{fontWeight:600}} >
            Forgot Password
          </Typography>
          <p className='text-[14px] mt-2'>Enter your email and we'll send you a otp to reset your password</p>

          {/* form  */}
          <div className='bg-white rounded-md  w-[80%] mt-32 p-6 formAnimation'>
                  <form className='flex flex-col gap-6 overflow-y-hidden'
                  onSubmit={submitHandler}>
            <TextField type="email" variant="filled"
            className='formItem'
            label="Email"
            placeholder='Enter your email'
            required
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
            InputProps={{
            startAdornment:(
                <InputAdornment position="start">
                   <CgMail size={25}/>
                </InputAdornment>
            )
            }}

            />

          <div className='flex items-center'>
            
            <Button
             variant="contained" 
             size="large" 
             className='formItem' 
             type="submit"
             disabled={loading}
             fullWidth
             >
                Submit
            </Button>

              {
            loading &&  <i class="fa-solid fa-spinner animate-spin -ml-8"></i>
           }
          </div>
          </form>
          </div>
        
        </div>

        {/* logo animation */}
        <div className='w-[50%] flex justify-center items-center'>
            <LogoAnimation/>
        </div>

    </div>
  )
}

export default ForgotPassword