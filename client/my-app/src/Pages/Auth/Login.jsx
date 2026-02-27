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

const Login = () => {

  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [loading,setLoading] = useState(false);
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  })

  useGSAP(()=>{

    const t1 = gsap.timeline();
    t1.from(".loginAnimation",{
    x:-100,
    opacity:0,
    delay:0.3,
    duration:0.6,
    });

    t1.from(".inputAnimation",{
    y:100,
    opacity:0,
    duration:0.3,
    stagger:0.2,
    },"-=0.9")
  });

  const onChangeHandler = (event)=>{
    const {name,value} = event.target;

    setFormData(prev =>{
     return {
      ...prev,
      [name]:value
     }
    })
  }


  const submitHandler =async(e)=>{
    e.preventDefault();

    const tostId = toast.loading("login...");
    try {
      setLoading(true);

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,formData);

      if(!response?.data?.success){
        throw new Error("Error occur during login");
      }

      toast.dismiss(tostId);
      toast.success(response?.data?.message);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.dismiss(tostId);
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }
  return (
    <div className='flex '>

      <div className='w-[50%] px-24 py-6 overflow-y-hidden '>
           <Typography variant="h3" sx={{fontWeight:600}} >
                 Welcome!
               </Typography>
                <p className='text-[14px] mt-2'>Login to Smart<span className='text-yellow-400 font-semibold text-[16px]'>X</span> to continue to Smart<span className='text-yellow-400 font-semibold text-[16px]'>X</span></p>



                {/* login form  */}
                <div className='w-[80%] bg-white rounded-md mt-24 p-6 overflow-y-hidden loginAnimation' >
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

                 <div className='flex flex-col'>
                     <TextField 
                     type={
                      showPassword ? "text" : "password"
                     }
                     name="password"
                     variant="filled"
                    placeholder='Your password'
                    label="Password"
                    required
                    fullWidth
                    onChange={onChangeHandler}
                    className='inputAnimation'
                    InputProps={{
                      endAdornment:(
                        <InputAdornment position="end">
                          {
                            showPassword ? <IoEyeSharp size={25} className='cursor-pointer'
                            onClick={()=>{setShowPassword(false)}}/> :
                             <BsFillEyeSlashFill size={25} className='cursor-pointer' 
                             onClick={()=>{setShowPassword(true)}}/>
                          }
                        </InputAdornment>
                      )
                    }}
                    />
                    <Link to={"#"} className=' inputAnimation text-[14px] text-blue-600 self-end'>
                    Forgot password?
                    </Link>
                 </div>

         <div>
                  <Button
                  variant="contained"
                     size="large"
                     fullWidth
                     type="submit"
                     className='inputAnimation'
                     sx={{textTransform:"none"}}
                     disabled={loading}
                  >
                  Log In
                 </Button>
                   {
            loading &&  <i class="fa-solid  fa-spinner animate-spin -ml-8"></i>
           }
         </div>
                  
                  </form>

              <p className='text-black mt-6 flex justify-center gap-2 text-[16px] inputAnimation'>
            Don't have an account?
             <span className='text-blue-600 cursor-pointer' 
             onClick={()=>{navigate("/")}}>Sign Up</span>
              </p>
                </div>
      </div>


        {/* logo animation  */}
      <div className='w-[50%] h-[100vh] flex items-center justify-center -ml-14'>
        <LogoAnimation/>
      </div>

   

    </div>
  )
}

export default Login