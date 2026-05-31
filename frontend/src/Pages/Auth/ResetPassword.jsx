import { Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import LogoAnimation from '../../components/Auth/LogoAnimation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { IoEyeSharp } from "react-icons/io5";
import { BsFillEyeSlashFill } from "react-icons/bs";
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {
  /* 🟢 Tip: Initializing as 'true' means password is hidden by default */
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useGSAP(() => {
    const t1 = gsap.timeline();
    t1.from(".resestfFormAnimation", {
      x: -50,
      opacity: 0,
      delay: 0.3,
      duration: 0.6,
    })

    t1.from(".inputAnimation", {
      y: 50,
      opacity: 0,
      duration: 0.3,
      stagger: 0.1,
    }, "-=0.4")
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = location.state?.email;

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const tostId = toast.loading("Changing password...");
    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/resetPassword`, {
        ...formData,
        email
      });

      if (!response?.data?.success) throw new Error("Reset failed");

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

  return (
    /* 🟢 Change 1: Responsive Flex Direction and Padding */
    <div className='flex flex-col lg:flex-row px-6 md:px-12 lg:px-24 w-full min-h-[calc(100vh-80px)] items-center justify-center gap-10 py-10'>

      {/* Form Section */}
      <div className='w-full lg:w-[50%] flex flex-col justify-center'>
        <div className='text-center lg:text-left'>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 600, 
              fontSize: { xs: '2.2rem', md: '3rem' } 
            }}
          >
            Change Your Password
          </Typography>
          <p className='text-[14px] mt-2 text-gray-400'>
            Enter a new password below to update your account access
          </p>
        </div>

        {/* reset password form box - 🟢 Change 2: Adaptive Width */}
        <div className='bg-white rounded-md mt-10 lg:mt-24 w-full md:w-[85%] lg:w-[80%] p-6 resestfFormAnimation shadow-xl mx-auto lg:mx-0'>
          <form className='flex flex-col gap-6' onSubmit={submitHandler}>
            <TextField
              type={showNewPassword ? "text" : "password"}
              variant="filled"
              placeholder='Enter your new password'
              label="New Password"
              required
              fullWidth
              className='inputAnimation'
              name='password'
              value={formData.password}
              onChange={onChangeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showNewPassword ? 
                      <IoEyeSharp size={22} className="cursor-pointer text-gray-600" onClick={() => setShowNewPassword(false)} /> : 
                      <BsFillEyeSlashFill size={22} className="cursor-pointer text-gray-600" onClick={() => setShowNewPassword(true)} />
                    }
                  </InputAdornment>
                )
              }}
            />

            <TextField
              type={showConfirmPassword ? "text" : "password"}
              variant="filled"
              placeholder='Confirm your new password'
              label="Re-enter new password"
              required
              fullWidth
              className='inputAnimation'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={onChangeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showConfirmPassword ? 
                      <IoEyeSharp size={22} className="cursor-pointer text-gray-600" onClick={() => setShowConfirmPassword(false)} /> : 
                      <BsFillEyeSlashFill size={22} className="cursor-pointer text-gray-600" onClick={() => setShowConfirmPassword(true)} />
                    }
                  </InputAdornment>
                )
              }}
            />

            <div className='relative flex items-center w-full'>
              <Button
                disabled={loading}
                variant="contained"
                type="submit"
                size="large"
                sx={{ textTransform: "none", py: 1.5, fontWeight: 'bold' }}
                className='inputAnimation'
                fullWidth
              >
                Reset Password
              </Button>
              {loading && (
                <i className="fa-solid fa-spinner animate-spin absolute right-4 text-white/50"></i>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Logo Animation - 🟢 Change 3: Responsive Scaling */}
      <div className='w-full lg:w-[50%] flex items-center justify-center mt-6 lg:mt-0'>
        <div className='scale-75 md:scale-90 lg:scale-100'>
          <LogoAnimation />
        </div>
      </div>

    </div>
  )
}

export default ResetPassword