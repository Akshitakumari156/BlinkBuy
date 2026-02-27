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
 const [formData,setFormData] = useState({
  firstName:"",
  lastName:"",
  password:"",
  confirmPassword:"",
  email:"",

 });

 const [showPassword,setShowPassword] = useState(false);
 const [confirShowPassword,setConfirmShowPassword] = useState(false);

 const [loading,setLoading]  = useState(false);

 const navigate = useNavigate();

 const changeHandler = (event)=>{
  setFormData(prev =>{
    return {
      ...prev,
      [event.target.name]:event.target.value,
    }
  });
 }

 const submitHandler = async(e)=>{
  e.preventDefault();

  if(formData.password !== formData.confirmPassword){
    toast.error("Password and Confirm password not matched");
    return;
  }

  if(formData.password.length < 8){
    toast.error("Password must includes minimum 8 latters");
    return;
  }

  const data = {
    email:formData.email,
  }

    const toastId = toast.loading("sending otp...");
  try {
    setLoading(true);
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create-otp`,data);

     if(!response.data.success){

         throw new Error("Error occur during signUp");
    }

    toast.dismiss(toastId);
    navigate("/otp",{state:{Data:formData}});
    toast.success(response.data.message);
    setLoading(false);
    
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(error.response?.data?.message || "Something went wrong");
    console.log(error);
    setLoading(false);
    }

  
 }

 useGSAP(()=>{
   const t1 = gsap.timeline();

   t1.from(".fA1",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
   })
   
   t1.from(".ipF",{
    y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
   },"-=0.9")
  })

  return (
    <div className='flex px-24 py-6 overflow-y-hidden '>
     {/* sign Up form */}
        <div className='w-[50%]'>
          <Typography variant="h3" sx={{fontWeight:600}} >
            Sign Up
          </Typography>
          <p className='text-[14px] mt-2'>Fill the form below to create your account</p>

          {/* form */}

       <div className='bg-white rounded-md  w-[80%] mt-6 p-6 overflow-y-hidden fA1' >
           <form className="  flex flex-col gap-6" onSubmit={submitHandler} >
            <TextField type="text" 
            variant="filled" 
            placeholder='Enter your first Name'
            label="First Name"
            fullWidth
            required
            onChange={changeHandler}
            name='firstName'
            className='ipF'
            />

            <TextField type="text" 
            variant="filled" 
            placeholder='Enter your Last Name'
            label="Last Name"
            fullWidth
            required
            onChange={changeHandler}
            name='lastName'
              className='ipF'
            />

           <TextField type="email" 
            variant="filled" 
            placeholder='Enter your email'
            label="Email"
            fullWidth
            required
            onChange={changeHandler}
            name='email'
              className='ipF'
            />

             <TextField type={showPassword ? "text" : "password"}
            variant="filled" 
            placeholder='Enter your password'
            label="Password"
            fullWidth
            required
           onChange={changeHandler}
            name='password'
              className='ipF'
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    
                    {
                      showPassword ? <IoEyeSharp size={25} className="cursor-pointer"
                      onClick={()=>{setShowPassword(false)}}/>
                      : <BsFillEyeSlashFill size={25} className="cursor-pointer"
                       onClick={()=>{setShowPassword(true)}}/>
                    }
                  </InputAdornment>
                )
              }}
            />

              <TextField type={
                confirShowPassword ? "text" : "password"
              }
            variant="filled" 
            placeholder='Confirm your password'
            label="Confirm Password"
            fullWidth
            required 
           onChange={changeHandler}
            name='confirmPassword'
              className='ipF'
                  InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                  
                      {
                      confirShowPassword ? <IoEyeSharp size={25} className="cursor-pointer"
                      onClick={()=>{setConfirmShowPassword(false)}}/>
                      : <BsFillEyeSlashFill size={25} className="cursor-pointer"
                       onClick={()=>{setConfirmShowPassword(true)}}/>
                    }
                  
                  </InputAdornment>
                )
              }}
            />

       <div className='flex items-center'>
             <Button variant="contained" 
            size="large"
           type="submit"
           fullWidth
           className='ipF'
           disabled={loading}
           sx={{textTransform:"none"}}
            >Sign Up</Button>
           {
            loading &&  <i class="fa-solid fa-spinner animate-spin -ml-8"></i>
           }
       </div>
         

          </form>
           <p className='text-black  mt-6 flex justify-center gap-2 text-[16px] ipF'>
            Allreday have an account?
             <span className='text-blue-600 cursor-pointer' 
             onClick={()=>{navigate("/login")}}>Sign In</span>
              </p>
       </div>
    
   </div>

        {/* smartX logo  */}
        <div className='w-[50%] flex justify-center items-center'>
         <LogoAnimation/>
          </div>
   </div>
  )
}

export default SignUp