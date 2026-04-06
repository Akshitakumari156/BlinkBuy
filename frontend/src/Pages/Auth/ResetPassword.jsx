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

  const [newPassword,setNewPassword] = useState(true);
  const [confirmNewPassword,setConfirmNewPassword] = useState(true);
  const [formData,setFormData] = useState({
    password:"",
    confirmPassword:"",
  });
  const location = useLocation();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  

  useGSAP(()=>{
    const t1 = gsap.timeline();

    t1.from(".resestfFormAnimation",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
    })

       t1.from(".inputAnimation",{
    y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
    },"-=0.6")
  })

  const onChangeHandler = (event)=>{
    const {name,value} = event.target;
    setFormData(prev=>{
      return {
        ...prev,
        [name] : value,
      }
    })
  }
  const submitHandler = async(e)=>{
    e.preventDefault();
      formData.email = location.state?.email;

        if(formData.password.length < 8){
        toast.error("Password must includes minimum 8 latters");
        return;
      }

    if(formData.password !== formData.confirmPassword){
      toast.error("Both passwords not matched");
      return;
    }
   
    const tostId = toast.loading("Changing password...");
    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/resetPassword`,formData);

      if(!response?.data?.success){
        throw new Error("Error occur during reset the pasword");
      }

      toast.dismiss(tostId);
      toast.success(response?.data?.message);
      setLoading(false);
      navigate("/login");
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss(tostId);
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  
    
  }
  return (
    <div className='flex px-24  w-screen '>
    
    <div className='w-[50%]'>
       
       <div>
         <Typography variant="h3" sx={{fontWeight:600}}>
        Change Your Password
      </Typography>
      <p className='text-[14px] mt-2'>Enter a new password below to chnage your password</p>
       </div>

       {/* reset password form  */}
       <div className='bg-white rounded-md mt-24  w-[80%] p-6 resestfFormAnimation overflow-y-hidden'>
    <form className=' flex flex-col gap-6'onSubmit={submitHandler}>
        <TextField 
        type={
          newPassword ? "password" : "text"
        }
        variant="filled"
        placeholder='Enter your new password'
        label="New Password"
        required
        className='inputAnimation'
        InputProps={{
          endAdornment:(
            <InputAdornment position="end">
             
             {
              newPassword ? <BsFillEyeSlashFill size={25} className="cursor-pointer"
              onClick={()=>{setNewPassword(false)}}/> 
              :
               <IoEyeSharp size={25} 
               className="cursor-pointer"
               onClick={()=>{setNewPassword(true)}}/>
             }
             
            </InputAdornment>
          )
        }}
        name='password'
        value={formData.password}
        onChange={onChangeHandler}
        />

        <TextField 
        type={
          confirmNewPassword ? "password" : "text"
        }
        variant="filled"
        placeholder='Confirm your new password'
        label="Re-enter new password"
        required
        className='inputAnimation'
           InputProps={{
          endAdornment:(
            <InputAdornment position="end">
                {
              confirmNewPassword ? <BsFillEyeSlashFill size={25} className="cursor-pointer"
              onClick={()=>{setConfirmNewPassword(false)}}/> 
              :
               <IoEyeSharp size={25} 
               className="cursor-pointer"
               onClick={()=>{setConfirmNewPassword(true)}}/>
             }
            </InputAdornment>
          )
        }}
        name='confirmPassword'
        value={formData.confirmPassword}
        onChange={onChangeHandler}
        />

      <div className='flex items-center w-full'>
          <Button 
        disabled={loading}
        variant="contained" 
        type="submit"
        size="large" sx={{textTransform:"none"}} 
        className='inputAnimation'
        fullWidth>
          Reset Password
        </Button>
           {
            loading &&  <i class="fa-solid fa-spinner animate-spin -ml-8"></i>
           }
      </div>
       </form>

       </div>
   
    </div>

    <div className='w-[50%] flex items-center justify-center h-[calc(100vh-80px)] '>
      <LogoAnimation/>
    </div>

    </div>
  )
}

export default ResetPassword