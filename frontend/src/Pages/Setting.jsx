import { Button, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/slices/userData';

const Setting = () => {

    const {userData} = useSelector((state)=> state.user);
    const {token} = useSelector((state)=> state.auth);
    const [file,setFile] = useState(null);
    const [showFile,setShowFile] = useState(null);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const [formData,setFormData] = useState({
      firstName:"",
      lastName:"",
    });
    const [password,setPassword] = useState({
      currentPassword:"",
      changePassword:"",
    })


    const fileHandler = (e)=>{
      setFile(e.target.files[0]);
      setShowFile(URL.createObjectURL(e.target.files[0]));

    }
    
    const updateProfilePictureHandler = async()=>{

        if(!file){
            return ;
        }
        const toastId = toast.loading("Updating profile pictiure...");

        const formData = new FormData();
        formData.append("image",file);
        formData.append("userId",userData?._id);

        try {
            setLoading(true);
            const response =  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/updateProfilePicture`,formData,{
              headers:{
                Authorization:'Bearer '+token,
              }
            });

            if(!response?.data?.success){
                throw new Error("Error occur duration updating profile picture");
            }

            console.log("response",response);
            toast.dismiss(toastId);
            dispatch(setUserData(response?.data?.updateUser));
            setFile(null);
            setShowFile(null);
            setLoading(false);
            toast.success(response?.data?.message);     
        } catch (error) {
          setLoading(false);
          toast.dismiss(toastId);
          console.log(error);
          toast.error(error.response?.data?.message || "Something went wrong");    
        }
    }

    useEffect(()=>{
      setFormData({
        firstName:userData?.firstName,
        lastName:userData?.lastName,
      })
    },[]);

    const onChangeHandler = (e)=>{

      const {name,value} = e.target;

      setFormData(prev=> {
        return {
          ...prev,
          [name]:value,
        }
      })
    }

    const passwordChangeHandler = (e)=>{

      const {name,value} = e.target;

      setPassword(prev => {
      return {
        ...prev,
        [name]:value,
      }
      })

    }

    const nameUpdateHandler = async()=>{
   
      if(userData?.firstName === formData.firstName && userData?.lastName === formData.lastName){
          toast.error("No changes made");
          return ;
      }
      
      formData.userId = userData?._id;

     const toastId = toast.loading("Updating name...");
      try {
        setLoading(true);
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/nameUpdate`,formData,{
          headers:{
            Authorization:'Bearer '+token,
          }
        });

        if(!response?.data?.success){
          throw new Error("Error occur during updating userName");
        }

        toast.dismiss(toastId);
        dispatch(setUserData(response?.data?.updateUser));
        toast.success(response?.data?.message);
        setLoading(false);
        
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.dismiss(toastId);
        toast.error(error.response?.data?.message || "Something went wrong");
        
      }
     

    }

    const passwordUpdateHandler = async()=>{
      if(password.changePassword.length < 8){
        toast.error("Password must include 8 characters");
        return ;
      }

      password.userId = userData?._id;

     const toastId = toast.loading("Updating password...");
     try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/passwordUpdate`,password,{
        headers:{
          Authorization:'Bearer '+token,
        }
      });

      if(!response?.data?.success){
        throw new Error("Error occur during updating password");
      }
      
      toast.dismiss(toastId);
      toast.success(response?.data?.message);
      setLoading(false);     
     } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");   
     }
      
    }
    

    
    
  return (
    <div className='w-[91vw] my-6 mx-auto flex flex-col gap-4'>

        {/* profile pictiure update  */}
        <div className='bg-gray-900 rounded-md px-2 py-4 flex gap-4 items-center'>

            {
                !showFile ?  <img src={userData?.profilePicture} alt={`${userData?.firstName}Image`} 
            className='h-20 w-20 rounded-full border border-gray-400 object-cover'/>
            :
            <img src={showFile} alt="selectedImage" 
            className='h-20 w-20 rounded-full object-cover border border-gray-40'/>

            }
            
            <div className='flex flex-col gap-2'>
                <p className='text-gray-400'>Change Profile Picture</p>
               <div className='flex items-center gap-2'>
                 <label>
                    <p className='px-3 py-2 cursor-pointer bg-yellow-400 font-semibold
                     hover:bg-yellow-600 rounded-md text-black transition-all duration-300 text-center '>
                      Change
                    </p>
                    <input type="file" className="hidden"
                    onChange={fileHandler}/>
                  
                </label>
                  {
                    file &&  <button className={`px-4 py-2 cursor-pointer bg-gray-600 font-semibold
                     hover:bg-gray-700 rounded-md text-white  transition-all duration-300 text-center 
                    `}
                      disabled={loading} onClick={updateProfilePictureHandler}>
                      Upload
                    </button>
                  }
               </div>
            </div>
        </div>
       
       {/* user information update  */}
        <div className='bg-gray-900 rounded-md px-2 py-4 flex flex-col gap-4'>
         

              <Typography variant="h6" className='text-gray-400'>Name Update</Typography>
          

            <div className=' flex flex-row gap-4 w-full'>

              {/* first Name */}
              <label className='flex flex-col gap-1 w-[50%]'>
                <p className='text-gray-300'>First Name  <sup className='text-red-600'>*</sup></p>
                <input type="text" 
                value={formData.firstName} 
                name='firstName'
                required
                onChange={onChangeHandler}
                 className='bg-gray-800 border-none outline-none px-3 py-2 rounded-md w-[100%]'
                placeholder='Enter your first Name'/>
              </label>

              {/* last Name  */}
               <label className='flex flex-col gap-1 w-[50%]'>
                <p className='text-gray-300'>Last Name  <sup className='text-red-600'>*</sup></p>
                <input type="text" 
                value={formData.lastName}
                name='lastName' 
                required
                onChange={onChangeHandler}
                className='bg-gray-800 border-none outline-none px-3 py-2 rounded-md w-[100%]'
                placeholder='Enter your last Name'/>
              </label>

            </div>
              <button disabled={loading} onClick={nameUpdateHandler} className='px-3 py-2 cursor-pointer bg-yellow-400 font-semibold
                     hover:bg-yellow-600 rounded-md text-black transition-all duration-300 text-center '>
                      Update
                    </button>

        </div>

      {/* password update  */}
          <div className='bg-gray-900 rounded-md px-2 py-4 flex flex-col gap-4'>
         

              <Typography variant="h6" className='text-gray-400'>Password</Typography>
          

            <div className=' flex flex-row gap-4 w-full'>

              {/* Current Password*/}
              <label className='flex flex-col gap-1 w-[50%]'>
                <p className='text-gray-300'>Current Password <sup className='text-red-600'>*</sup> </p>
                <input type="password"
                value={password.currentPassword} 
                name='currentPassword'
                required
                onChange={passwordChangeHandler}
                 className='bg-gray-800 border-none outline-none px-3 py-2 rounded-md w-[100%]'
                placeholder='Enter your current password'/>
              </label>

              {/* Change Password  */}
               <label className='flex flex-col gap-1 w-[50%]'>
                <p className='text-gray-300'>Change Password  <sup className='text-red-600'>*</sup></p>
                <input type="password"
                value={password.changePassword}
                name='changePassword' 
                required
                onChange={passwordChangeHandler}
                className='bg-gray-800 border-none outline-none px-3 py-2 rounded-md w-[100%]'
                placeholder='Enter your change password'/>
              </label>

            </div>
              <button disabled={loading} onClick={passwordUpdateHandler} className='px-3 py-2 cursor-pointer bg-yellow-400 font-semibold
                     hover:bg-yellow-600 rounded-md text-black transition-all duration-300 text-center '>
                      Update
                    </button>

        </div>
    </div>
  )
}

export default Setting