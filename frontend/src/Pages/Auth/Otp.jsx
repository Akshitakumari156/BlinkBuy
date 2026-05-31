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
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const resendOtpHandler = async () => {
        const data = { email: formData?.email };
        const toastId = toast.loading("sending otp...");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`, data);
            if (!response.data.success) throw new Error("Error occur during resend");
            toast.dismiss(toastId);
            toast.success(response.data.message);
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    const verifyOtpHandler = async () => {
        if (otp.length < 4) {
            toast.error("Please fill the otp");
            return;
        }
        formData.otp = otp;
        const tostId = toast.loading("Verifying otp...");
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData);
            if (!response?.data?.success) throw new Error("Error verifying otp");
            toast.dismiss(tostId);
            toast.success(response?.data?.message);
            navigate("/login");
        } catch (error) {
            toast.dismiss(tostId);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useGSAP(() => {
        gsap.from(".otpAnimation", {
            /* 🟢 Change 1: Reduced x to prevent horizontal scroll on mobile */
            x: -50,
            opacity: 0,
            delay: 0.3,
            duration: 0.6,
        });
    });

    return (
        /* 🟢 Change 2: flex-col for mobile, lg:flex-row for laptop. Full height centering. */
        <div className='flex flex-col lg:flex-row min-h-[calc(100vh-80px)] items-center justify-center px-4 md:px-10 gap-10 py-10'>

            {/* OTP Section */}
            <div className='flex items-center justify-center w-full lg:w-[50%] otpAnimation'>
                <div className='flex items-center justify-center flex-col gap-2 w-full max-w-md'>
                    <h2 className='font-bold text-2xl md:text-3xl text-center'>We sent you a code</h2>
                    <p className='text-gray-400 text-center text-sm md:text-base'>Please enter it below to verify your email</p>
                    <p className='text-blue-500 font-medium text-sm text-center break-all'>
                        {formData?.email}
                    </p>

                    <div className='mt-8'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span className='mx-2 md:mx-4 text-gray-500'>-</span>}
                            /* 🟢 Change 3: Responsive input sizing (w-12 on mobile, w-16+ on desktop) */
                            renderInput={(props) => (
                                <input {...props}
                                    className='w-12 h-12 md:w-16 md:h-16 text-2xl md:text-3xl text-center text-white bg-gray-800 border border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none transition-all' 
                                />
                            )}
                        />
                    </div>

                    <div className='w-full mt-8 relative flex items-center'>
                        <Button 
                            variant="contained" 
                            size="large" 
                            fullWidth
                            onClick={verifyOtpHandler}
                            disabled={loading}
                            sx={{ textTransform: "none", py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
                        >
                            Verify OTP
                        </Button>
                        {loading && (
                            <i className="fa-solid fa-spinner animate-spin absolute right-4 text-white/50"></i>
                        )}
                    </div>

                    <div className='mt-4'>
                        <p className='text-gray-400'>
                            Don't get the code? 
                            <span className="text-blue-500 underline cursor-pointer ml-2 font-medium hover:text-blue-400" onClick={resendOtpHandler}>
                                Resend code
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Logo Animation Section - 🟢 Change 4: Adjusted visibility and spacing */}
            <div className='w-full lg:w-[50%] flex items-center justify-center lg:border-l lg:border-gray-800'>
                <div className='scale-75 md:scale-90 lg:scale-100'>
                    <LogoAnimation />
                </div>
            </div>

        </div>
    )
}

export default Otp