import { Typography } from '@mui/material';
import moment from 'moment/moment';
import React from 'react'
import { LuIndianRupee } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { addProductToWishlist, removeProductFromWislist } from '../../../redux/slices/wishlist';
import { IoHeart } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const ProductCard = ({product}) => {

  const {allProducts} = useSelector((state)=> state.wishlist);
  const navigate = useNavigate();

  const dispatch = useDispatch(); 

  const addProductToWishlistHandler =  ()=>{
    dispatch(addProductToWishlist(product));
  }

  const removeProductHandler = ()=>{
    dispatch(removeProductFromWislist(product));
  }
  
  return (
    <div className='w-[337px] h-[315px] border bg-gray-900 border-gray-600 px-2 py-2 rounded-md flex flex-col gap-4 cursor-pointer'
    >

       <div className=' w-full h-[180px] relative '>
         <img src={product?.images[0].url} alt={`${product?.productName}Image`}
         className='  w-full h-full object-cover' onClick={()=>{navigate(`/product-details/${product?._id}`)}}/>

         <div className="absolute top-1 right-1 bg-gray-50 p-2 rounded-full">
          {
            allProducts.some((item)=> item?._id === product?._id ) ? 
            <IoHeart size={25} className='text-black' onClick={removeProductHandler}/> 
            : 
           <GoHeart size={25} className='text-black' onClick={addProductToWishlistHandler}/>
          }
         

         </div>
       </div>

         <div onClick={()=>{navigate(`/product-details/${product?._id}`)}}>

            {/* price  */}
          <div className='flex items-center gap-1 font-semibold text-[18px]'>

            <LuIndianRupee/>
           <p>
             {
                product?.price
            }
           </p>
        </div>

        {/* productName */}
        <div className='text-gray-300 -mt-1 mb-1' >
            <Typography noWrap>
                 {
                    product?.productName
                }
            </Typography>
        </div>


        {/* product description */}
        <div className='text-gray-300 '>
            <Typography noWrap sx={{fontSize:"14px"}}>
                {
                    product?.description
                }
            </Typography>
        </div>

        {/* location */}
        <div  className='text-gray-300 w-[100%] flex items-center '>
         <div className='w-[70%]'>
               <Typography noWrap sx={{fontSize:"12px"}}>
                {
                    product?.location
                }
            </Typography>
         </div>

         <div className='w-[30%] text-xs'>
            <p>
                {
                   moment(product?.createdAt).format('ll')
                }
            </p>
         </div>
        </div>
         </div>
    </div>
  )
}

export default ProductCard