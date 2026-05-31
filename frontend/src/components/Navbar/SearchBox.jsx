import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import Loader from "../Common/Loader";
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const onchangeHandler = async (e) => {
    setUserInput(e.target.value);
    const inputValue = e.target.value;

    if (!inputValue || inputValue.length < 2) {
      setAllProducts([]); // Clear results if input is too short
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/searchProduct?textSearch=${inputValue}`);
      if (!response?.data?.success) {
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (allProducts.length < 1) return;
    setUserInput("");
    navigate("/searchProducts", { state: { allProducts: allProducts } });
  }

  return (
    /* Container: Full width on mobile, max-width 750px on PC */
    <div className='relative w-full lg:max-w-[750px] mx-auto'>
      
      <form className='flex items-center w-full' onSubmit={submitHandler}>
        <input 
          type="text" 
          value={userInput}
          /* Input: Responsive width classes */
          className='bg-gray-700 outline-none w-full px-4 py-2 rounded text-[16px] text-white'
          placeholder='Search for Products...'
          onChange={onchangeHandler} 
        />
        <button type="submit" className='bg-gray-950 -ml-10 p-2 rounded-r'>
          <FaMagnifyingGlass size={20} className='cursor-pointer text-white'/>
        </button>
      </form>

      {userInput.length > 1 && (
        /* Dropdown: Matches input width exactly on all devices */
        <div className="absolute top-full left-0 w-full bg-gray-700 mt-1 shadow-xl z-50 rounded-b max-h-[300px] overflow-y-auto">
          {loading ? (
            <div className='flex items-center justify-center p-4'><Loader /></div>
          ) : (
            <div className='w-full'>
              {allProducts.length < 1 ? (
                <div className='p-4 text-center text-gray-300 font-semibold'>
                  Products not found
                </div>
              ) : (
                <div className='flex flex-col'>
                  {allProducts.slice(0, 6).map((product, index) => (
                    <div 
                      key={index} 
                      className='px-4 py-3 border-b border-gray-600 last:border-none cursor-pointer hover:bg-gray-600 text-white'
                      onClick={() => {
                        setUserInput("");
                        navigate("/searchProducts", { state: { allProducts: allProducts } });
                      }}
                    >
                      {product?.productName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBox;