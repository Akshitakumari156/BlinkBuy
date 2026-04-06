import { Button, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from '../components/Home/Product/ProductCard';
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import SkelatonLoading from '../components/Common/SkelatonLoading';

const WishListProducts = () => {
      const { allProducts } = useSelector((state) => state.wishlist);
      const naviagte = useNavigate();
  return (
    <div className='w-[91vw] mx-auto mt-6'>
    <div className='flex items-center justify-between'>
                <Typography variant="h5" sx={{textTransform:"uppercase",}}
        className="text-yellow-400">Wishlist</Typography>
        <div className='flex items-center gap-1'>
            <p className='text-gray-300 font-semibold text-[18px]'>Total Products :</p>
            <p className="  left-[15px] text-yellow-400 font-semibold"> {allProducts?.length}</p>    
        </div>
    </div>
       <hr className='mt-1'/>

     {
        allProducts?.length < 1  
        ?
     (
     <div className='w-full mb-4 flex items-center justify-center mt-36 flex-col gap-4'>
        <IoHeartDislikeOutline size={77}/>
        <div className='flex flex-col justify-center items-center gap-2'>
            <p className='font-semibold text-xl text-gray-300'>You haven't liked any ads yet</p>
            <p className='text-gray-400 mb-2'>Like ads and share <br /> them with the world</p>
            <Button onClick={()=>naviagte("/")}  variant="outlined" color="info" size="large" sx={{textTransform:"none"}}>Discover</Button>
        </div>
     </div>
     )
     : 
     (     <div className='flex flex-wrap gap-4 py-6'>


          {
        allProducts?.map((product,index)=> {
            return <div key={index}>
                <ProductCard product={product}/>
            </div>
        })
       }
     </div>)
     }
    </div>
  )
}

export default WishListProducts