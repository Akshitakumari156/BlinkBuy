import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import SkelatonLoading from '../../components/Common/SkelatonLoading';
import ProductCard from '../../components/Home/Product/ProductCard';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const {token} = useSelector((state)=> state.auth);
  const [loading,setLoading] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState(false);
  const [allProducts,setAllProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async()=>{
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userProducts`,{
        headers:{
          Authorization:'Bearer '+token,
        }
      });

      if(!response?.data?.success){
        throw new Error("Error occur during fetching user all products");
      }
      setAllProducts(response?.data?.allProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
      
    }
  }

  const deleteProdoctHandler = async(productId)=>{

    const confirm = window.confirm("Are you sure want to delete this product?");

    if(!confirm){
      return ;
    }

    if(deleteLoading){
      return ;
    }
    
  const toastId = toast.loading("Deleting product...");

    try {
      setDeleteLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteProduct/${productId}`,{
        headers:{
          Authorization:'Bearer '+token,
        }
      });

      if(!response?.data?.success){
        throw new Error("Error occur during deleting the product");
      }

      const remainingProducts = allProducts.filter((product)=> product?._id !== productId);
      setAllProducts(remainingProducts);   
      toast.dismiss(toastId);
      setDeleteLoading(false);
      toast.success(response?.data?.message);
      
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      setDeleteLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }

  useEffect(()=>{
    getAllProducts();
  },[])

  console.log("allProducts",allProducts);
  
  return (
    <div className='py-6'>
      {
        loading ?  (<div className='flex flex-wrap flex-row gap-4 w-[91vw] mx-auto'>{
          Array.from({length:4}).map((_,index)=>{
            return <div key={index}><SkelatonLoading/></div>
          })
        }</div>)
        :
        (<div>
          {
            allProducts.length < 1 ? (<div className='py-56 text-center font-semibold text-xl'>Products not found</div>)
            :
            (<div className='flex flex-wrap flex-row gap-4 w-[91vw] mx-auto'>
              {
                allProducts.map((product,index)=>{
                  return <div key={index} className='flex flex-col gap-2 '>
                    <ProductCard product={product}/>
                    <div className='flex flex-row justify-between px-2 pt-4 pb-2 items-center border-b border-l border-r -mt-4
                    border-gray-600 rounded-b-md '>

                      <div onClick={()=>{
                        navigate("/upload-product",{state:product})
                      }}>
                       
                        <MdOutlineModeEdit size={25} className='cursor-pointer hover:text-gray-400 transition-all duration-300'/>
                        </div>
                      <div onClick={()=>{
                        deleteProdoctHandler(product?._id)
                      }}>
                        <MdDelete  size={25} className='cursor-pointer hover:text-gray-400 transition-all duration-300'/>
                      </div>

                    </div>
                  </div>
                })
              }
            </div>)
          }
        </div>)
      }
    </div>
  )
}

export default MyProducts