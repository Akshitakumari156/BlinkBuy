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
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const navigate = useNavigate();

    useGSAP(() => {
        gsap.from(".otpAnimation", {
            /* 🟢 Change 1: Reduced x offset to prevent horizontal scroll on mobile */
            x: -50,
            opacity: 0,
            delay: 0.3,
            duration: 0.6,
        });
    });

    const resendOtpHandler = async () => {
        const tostId = toast.loading("sending otp...");
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sendOtpforgotPassword`, { email: userEmail });

            if (!response?.data?.success) {
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

    const otpVerifyHandler = async () => {
        if (otp.length < 4) {
            toast.error("Please fill the otp");
            return;
        }
        const tostId = toast.loading("Verifying otp...");
        try {
            setOtpLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/forgotPasswordOtpVerifiy`, {
                email: userEmail,
                otp: otp
            });

            if (!response?.data?.success) {
                throw new Error("Error occur during verifying otp for reset password")
            }

            toast.dismiss(tostId);
            navigate("/reset-password", { state: { email: userEmail } });
            toast.success(response?.data?.message);
            setOtpLoading(false);
        } catch (error) {
            setOtpLoading(false);
            toast.dismiss(tostId);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        /* 🟢 Change 2: flex-col for mobile, lg:flex-row for laptop. Responsive padding. */
        <div className='flex flex-col lg:flex-row w-full min-h-[calc(100vh-80px)] items-center justify-center px-4 md:px-12 lg:px-24 py-10 gap-10'>

            {/* OTP Section */}
            <div className='flex items-center justify-center w-full lg:w-[50%] otpAnimation'>
                <div className='flex items-center justify-center flex-col gap-2 w-full max-w-md'>
                    <h2 className='font-bold text-2xl md:text-3xl text-center'>We sent you a code</h2>
                    <p className='text-gray-400 text-center'>Please enter it below to verify your email</p>
                    <p className='text-blue-500 font-medium text-center break-all'>
                        {userEmail}
                    </p>

                    <div className='mt-8'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span className='mx-2 md:mx-4 text-gray-500'>-</span>}
                            /* 🟢 Change 3: Responsive widths (w-14 on mobile, w-20 on desktop) */
                            renderInput={(props) => (
                                <input {...props} 
                                    className='w-14 h-14 md:w-20 md:h-20 text-3xl md:text-4xl text-center text-white bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-all'
                                />
                            )}
                        />
                    </div>

                    <div className='w-full mt-8 relative flex items-center'>
                        <Button 
                            variant="contained" 
                            size="large" 
                            fullWidth
                            onClick={otpVerifyHandler}
                            disabled={otpLoading}
                            sx={{ textTransform: "none", py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
                        >
                            Verify OTP
                        </Button>
                        {otpLoading && (
                            <i className="fa-solid fa-spinner animate-spin absolute right-4 text-white/50"></i>
                        )}
                    </div>

                    <div className='mt-4'>
                        <p className='text-gray-400'>
                            Don't get the code? 
                            <span 
                                className="text-blue-500 underline cursor-pointer ml-2 font-medium hover:text-blue-400" 
                                onClick={resendOtpHandler}
                            >
                                Resend code
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Logo Animation Section */}
            <div className='w-full lg:w-[50%] flex items-center justify-center mt-6 lg:mt-0'>
                <div className='scale-75 md:scale-90 lg:scale-100'>
                    <LogoAnimation />
                </div>
            </div>

        </div>
    )
}

export default ResetPassOtpVerify;