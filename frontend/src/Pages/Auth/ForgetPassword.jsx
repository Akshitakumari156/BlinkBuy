import React, { useState } from 'react'
import LogoAnimation from '../../components/Auth/LogoAnimation'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import { CgMail } from "react-icons/cg";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useGSAP(() => {
        const t1 = gsap.timeline();
        t1.from(".formAnimation", {
            x: -900,
            opacity: 0,
            delay: 0.3,
            duration: 0.6,
        })

        t1.from(".formItem", {
            y: 100,
            opacity: 0,
            duration: 0.3,
            stagger: 0.2
        }, "-=0.3")
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        const tostId = toast.loading("checking and processing...");
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpforgotPassword`, { email });

            if (!response?.data?.success) {
                throw new Error("Error occur during sending otp for reset password");
            }

            toast.dismiss(tostId);
            navigate("/resetPassOtpVerify", { state: email });
            toast.success(response?.data?.message);
            setLoading(false);
        } catch (error) {
            toast.dismiss(tostId);
            setLoading(false);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        /* 🟢 Change 1: Flex-col on mobile, Flex-row on Laptop. Reduced padding for mobile. */
        <div className='flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 min-h-[calc(100vh-80px)] items-center justify-center gap-10 py-10'>

            {/* forgot password form container */}
            <div className='w-full lg:w-[50%] flex flex-col justify-center'>
                
                {/* 🟢 Change 2: Responsive Typography sizes */}
                <Typography 
                    variant="h3" 
                    sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: '2rem', md: '3rem' }, // Smaller on mobile
                        textAlign: { xs: 'center', lg: 'left' } 
                    }} 
                >
                    Forgot Password
                </Typography>
                
                <p className='text-[14px] mt-2 text-center lg:text-left text-gray-400'>
                    Enter your email and we'll send you an OTP to reset your password
                </p>

                {/* form box - 🟢 Change 3: Fluid width and adjusted margin-top */}
                <div className='bg-white rounded-md w-full md:w-[85%] lg:w-[80%] mx-auto lg:mx-0 mt-10 lg:mt-24 p-6 formAnimation shadow-xl'>
                    <form className='flex flex-col gap-6 overflow-y-hidden' onSubmit={submitHandler}>
                        <TextField 
                            type="email" 
                            variant="filled"
                            className='formItem'
                            label="Email"
                            placeholder='Enter your email'
                            required
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CgMail size={25} />
                                    </InputAdornment>
                                )
                            }}
                        />

                        <div className='flex items-center relative'>
                            <Button
                                variant="contained"
                                size="large"
                                className='formItem'
                                type="submit"
                                disabled={loading}
                                fullWidth
                                sx={{ 
                                    textTransform: "none", 
                                    py: 1.5, 
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold' 
                                }}
                            >
                                Submit
                            </Button>

                            {loading && (
                                <div className="absolute right-4 text-blue-600">
                                    <i className="fa-solid fa-spinner animate-spin"></i>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* logo animation - 🟢 Change 4: Hide on very small screens or adjust size */}
            <div className='w-full lg:w-[50%] flex justify-center items-center mt-10 lg:mt-0'>
                <div className='scale-75 md:scale-100'>
                    <LogoAnimation />
                </div>
            </div>

        </div>
    )
}

export default ForgotPassword