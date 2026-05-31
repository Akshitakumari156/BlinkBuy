import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoAnimation from '../../components/Auth/LogoAnimation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/slices/auth';
import { setUserData } from '../../redux/slices/userData';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  useGSAP(() => {
    const t1 = gsap.timeline();
    t1.from(".loginAnimation", {
      /* 🟢 Change 1: Reduced x offset for mobile so it doesn't start from way off-screen */
      x: -50, 
      opacity: 0,
      delay: 0.3,
      duration: 0.6,
    });

    t1.from(".inputAnimation", {
      y: 50,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
    }, "-=0.4")
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const tostId = toast.loading("login...");
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData);
      if (!response?.data?.success) throw new Error("Error occur during login");

      toast.dismiss(tostId);
      dispatch(setToken(response?.data?.token));
      dispatch(setUserData(response?.data?.userDeatails));
      navigate("/");
      toast.success(response?.data?.message);
    } catch (error) {
      setLoading(false);
      toast.dismiss(tostId);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    /* 🟢 Change 2: flex-col for mobile, lg:flex-row for desktop. Responsive padding. */
    <div className='flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 min-h-[calc(100vh-80px)] items-center justify-center py-10 gap-10'>

      {/* Left Section: Form */}
      <div className='w-full lg:w-[50%] flex flex-col justify-center'>
        <div className='text-center lg:text-left'>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '2.5rem', md: '3rem' } 
            }}
          >
            Welcome!
          </Typography>
          <p className='text-[14px] mt-2 text-gray-400'>
            Login to Smart<span className='text-yellow-400 font-semibold text-[16px]'>X</span> to continue
          </p>
        </div>

        {/* login form box - 🟢 Change 3: Fluid width */}
        <div className='w-full sm:w-[90%] md:w-[80%] bg-white rounded-md mt-10 lg:mt-24 p-6 shadow-xl loginAnimation mx-auto lg:mx-0'>
          <form className='flex flex-col gap-6' onSubmit={submitHandler}>
            <TextField 
              type="email"
              variant="filled"
              placeholder='Your email address'
              label="Email" 
              fullWidth
              required
              className='inputAnimation'
              name="email"
              onChange={onChangeHandler}
            />

            <div className='flex flex-col gap-1'>
              <TextField 
                type={showPassword ? "text" : "password"}
                name="password"
                variant="filled"
                placeholder='Your password'
                label="Password"
                required
                fullWidth
                onChange={onChangeHandler}
                className='inputAnimation'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? 
                        <IoEyeSharp size={22} className='cursor-pointer text-gray-600' onClick={() => setShowPassword(false)} /> :
                        <BsFillEyeSlashFill size={22} className='cursor-pointer text-gray-600' onClick={() => setShowPassword(true)} />
                      }
                    </InputAdornment>
                  )
                }}
              />
              <Link to={"/forgot-password"} className='inputAnimation text-[13px] text-blue-600 self-end hover:underline mt-1'>
                Forgot password?
              </Link>
            </div>

            <div className='relative flex items-center'>
              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                className='inputAnimation'
                sx={{ textTransform: "none", py: 1.5, fontWeight: 'bold', fontSize: '1rem' }}
                disabled={loading}
              >
                Log In
              </Button>
              {loading && <i className="fa-solid fa-spinner animate-spin absolute right-4 text-blue-200"></i>}
            </div>
          </form>

          <p className='text-black mt-8 flex justify-center flex-wrap gap-2 text-[15px] inputAnimation'>
            Don't have an account?
            <span className='text-blue-600 font-semibold cursor-pointer hover:underline' onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>

      {/* Right Section: Logo Animation - 🟢 Change 4: Dynamic sizing/visibility */}
      <div className='w-full lg:w-[50%] flex items-center justify-center mt-6 lg:mt-0'>
        <div className='scale-75 md:scale-90 lg:scale-100'>
          <LogoAnimation />
        </div>
      </div>
    </div>
  )
}

export default Login