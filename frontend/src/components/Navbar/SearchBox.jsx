import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import Loader from "../Common/Loader";
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {

  const [userInput,setUserInput] = useState("");
  const [loading,setLoading] = useState(false);
  const [allProducts,setAllProducts] = useState([]);
  const navigate = useNavigate();

  
  const onchangeHandler = async(e)=>{
     setUserInput(e.target.value);
     const inputValue = e.target.value;

     if(!inputValue){
       return ;
     }

     if(inputValue.length < 3){
      return;
     }

     try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/searchProduct?textSearch=${inputValue}`);
      if(!response?.data?.success){
        throw new Error("error occur during searching product");
      }
      setAllProducts(response?.data?.allProducts);
      setLoading(false); 
     } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
      
     }
     

  }
 
  const submitHandler = (e)=>{
    e.preventDefault();
    if(allProducts.length < 1){
     return ;
    }
    setUserInput("");
    navigate("/searchProducts",{state:{ allProducts:allProducts}});
  }
  


  
 
  return (
<div className='relative'>
      <form className='flex items-center'
      onSubmit={submitHandler}>
       <input type="text" 
       className='bg-gray-700 outline-none w-[750px] px-2 py-2 rounded text-[16px]'
       placeholder='Search for Products, Brands and More'
       onChange={onchangeHandler} />
      <button type="submit" className='bg-gray-950 -ml-7 p-2'>
         <FaMagnifyingGlass size={25} className='cursor-pointer'/>
      </button>
    </form>

      {
       userInput.length > 2 && <div className="absolute  bg-gray-700 w-[761px] min-h-[50px] z-50 ">
             
             {
                loading ? (<div className='h-full flex items-center justify-center p-2'><Loader/></div>) 
                : 
                (<div className='h-full'>
                  {
                    allProducts.length < 1 ? (<div className='h-full flex items-center justify-center
                      font-semibold pt-3'>Products not found</div>)
                    :
                    (<div className='flex flex-col gap-2'>
                      {
                        allProducts.slice(0,6).map((product,index)=> {
                          return <div key={index} className='px-2 py-3 border-b border-gray-950 cursor-pointer'
                          onClick={()=>{
                            setUserInput("");
                            navigate("/searchProducts",{state:{
                              allProducts:allProducts
                            }});
                          }}>
                            {
                              product?.productName
                            }
                          </div>
                        })
                      }
                    </div>)
                  }
                </div>)
             }

    </div>
      }


</div>
  )
}

export default SearchBox