import React, { useEffect, useState } from 'react'
import LogoAnimation from '../../components/Auth/LogoAnimation'
import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [confirShowPassword, setConfirmShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Password and Confirm password not matched");
            return;
        }

        if (formData.password.length < 8) {
            toast.error("Password must includes minimum 8 letters");
            return;
        }

        const data = { email: formData.email };
        const toastId = toast.loading("sending otp...");
        
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`, data);

            if (!response.data.success) {
                throw new Error("Error occur during signUp");
            }

            toast.dismiss(toastId);
            navigate("/otp", { state: { Data: formData } });
            toast.success(response.data.message);
            setLoading(false);

        } catch (error) {
            toast.dismiss(toastId);
            toast.error(error.response?.data?.message || "Something went wrong");
            setLoading(false);
        }
    }

    useGSAP(() => {
        const t1 = gsap.timeline();
        t1.from(".fA1", {
            x: -50, /* 🟢 Change 1: Reduced x offset for mobile stability */
            opacity: 0,
            delay: 0.3,
            duration: 0.6,
        })

        t1.from(".ipF", {
            y: 50,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
        }, "-=0.4")
    })

    return (
        /* 🟢 Change 2: flex-col for mobile, responsive padding, and overflow handling */
        <div className='flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 min-h-[calc(100vh-80px)] py-10 gap-10 items-center justify-center'>
            
            {/* sign Up form section */}
            <div className='w-full lg:w-[50%]'>
                <div className='text-center lg:text-left'>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 600, 
                            fontSize: { xs: '2.5rem', md: '3rem' } 
                        }} 
                    >
                        Sign Up
                    </Typography>
                    <p className='text-[14px] mt-2 text-gray-400'>Fill the form below to create your account</p>
                </div>

                {/* form box - 🟢 Change 3: Fluid width for better mobile tap targets */}
                <div className='bg-white rounded-md w-full md:w-[90%] lg:w-[85%] mt-8 p-6 shadow-lg fA1 mx-auto lg:mx-0'>
                    <form className="flex flex-col gap-5" onSubmit={submitHandler}>
                        
                        {/* 🟢 Change 4: First & Last Name can be row on desktop, col on mobile if desired, 
                            but keeping vertical list for maximum mobile comfort here */}
                        <TextField 
                            type="text" 
                            variant="filled" 
                            label="First Name"
                            fullWidth
                            required
                            onChange={changeHandler}
                            name='firstName'
                            className='ipF'
                        />

                        <TextField 
                            type="text" 
                            variant="filled" 
                            label="Last Name"
                            fullWidth
                            required
                            onChange={changeHandler}
                            name='lastName'
                            className='ipF'
                        />

                        <TextField 
                            type="email" 
                            variant="filled" 
                            label="Email"
                            fullWidth
                            required
                            onChange={changeHandler}
                            name='email'
                            className='ipF'
                        />

                        <TextField 
                            type={showPassword ? "text" : "password"}
                            variant="filled" 
                            label="Password"
                            fullWidth
                            required
                            onChange={changeHandler}
                            name='password'
                            className='ipF'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {showPassword ? 
                                            <IoEyeSharp size={22} className="cursor-pointer" onClick={() => setShowPassword(false)} /> : 
                                            <BsFillEyeSlashFill size={22} className="cursor-pointer" onClick={() => setShowPassword(true)} />
                                        }
                                    </InputAdornment>
                                )
                            }}
                        />

                        <TextField 
                            type={confirShowPassword ? "text" : "password"}
                            variant="filled" 
                            label="Confirm Password"
                            fullWidth
                            required 
                            onChange={changeHandler}
                            name='confirmPassword'
                            className='ipF'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {confirShowPassword ? 
                                            <IoEyeSharp size={22} className="cursor-pointer" onClick={() => setConfirmShowPassword(false)} /> : 
                                            <BsFillEyeSlashFill size={22} className="cursor-pointer" onClick={() => setConfirmShowPassword(true)} />
                                        }
                                    </InputAdornment>
                                )
                            }}
                        />

                        <div className='flex items-center relative'>
                            <Button 
                                variant="contained" 
                                size="large"
                                type="submit"
                                fullWidth
                                className='ipF'
                                disabled={loading}
                                sx={{ textTransform: "none", py: 1.5, fontWeight: 'bold' }}
                            >
                                Sign Up
                            </Button>
                            {loading && <i className="fa-solid fa-spinner animate-spin absolute right-4 text-white/50"></i>}
                        </div>
                    </form>

                    <p className='text-gray-600 mt-6 flex justify-center flex-wrap gap-2 text-[15px] ipF'>
                        Already have an account?
                        <span className='text-blue-600 font-semibold cursor-pointer hover:underline' onClick={() => navigate("/login")}>
                            Sign In
                        </span>
                    </p>
                </div>
            </div>

            {/* Logo animation section */}
            <div className='w-full lg:w-[50%] flex justify-center items-center mt-10 lg:mt-0'>
                <div className='scale-75 md:scale-100'>
                    <LogoAnimation />
                </div>
            </div>
        </div>
    )
}

export default SignUp