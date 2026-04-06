import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSettingsOutline } from "react-icons/io5";
import { LuBadgeHelp } from "react-icons/lu";
import { MdLogout } from "react-icons/md";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { removeToken } from '../../redux/slices/auth';
import { setUserData } from '../../redux/slices/userData';
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import toast from 'react-hot-toast';

const UserProfileDropdown = ({setShowDropDown}) => {

    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    const showDialog = ()=>{
        setOpen(true);
    }
    const cancelHandler = ()=>{
        setOpen(false);
        setShowDropDown(false);
    }
    const logoutHandler = ()=>{
        dispatch(removeToken());
        dispatch(setUserData(null));
        setOpen(false);
        setShowDropDown(false);
        toast.success("Logout Successfully");
    }
  return (
    <div className='px-4 py-1 pb-3 flex flex-col gap-4'>
        <Link to="/settings" className='flex items-center gap-4 '
        onClick={()=>{setShowDropDown(false)}}>
        <IoSettingsOutline size={25}/>
         <p className='font-semibold text-[18px]'>Settings</p>
        </Link>

         <Link to="/myproducts" className='flex items-center gap-4 '
        onClick={()=>{setShowDropDown(false)}}>
        <MdOutlineProductionQuantityLimits size={25}/>
         <p className='font-semibold text-[18px]'>My Products</p>
        </Link>

          <Link to="/help" className='flex items-center gap-4 '
          onClick={()=>{setShowDropDown(false)}}>
        <LuBadgeHelp size={25}/>
         <p className='font-semibold text-[18px]'>Help</p>
        </Link>
        <div className='flex items-center gap-4 cursor-pointer'
        onClick={showDialog}
        >
            <MdLogout size={25}/>
            <p className='font-semibold text-[18px]'>Logout</p>
        </div>

        <Dialog open={open} onClose={()=>{
            setOpen(false)
        }}>
          <DialogTitle sx={{fontWeight:700}}>Logout Confirmation</DialogTitle>

          <DialogContent>
            Are you sure you want to logout?
          </DialogContent>

          <DialogActions>
            <Button variant="outlined" sx={{textTransform:"none"}}
            onClick={cancelHandler}>Cancel</Button>
            <Button variant="contained" color="error"  sx={{textTransform:"none"}}
            onClick={logoutHandler}>Yes</Button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default UserProfileDropdown