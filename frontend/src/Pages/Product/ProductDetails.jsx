import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loader from "../../components/Common/Loader";
import { LuIndianRupee } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { BiShareAlt } from "react-icons/bi";
import moment from "moment";
import { Button, Typography } from "@mui/material";
import { IoCallOutline } from "react-icons/io5";
import aiImage from "../../assets/gemini-color.png"
import { IoHeart } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addProductToWishlist, removeProductFromWislist } from "../../redux/slices/wishlist";
import copy from 'copy-to-clipboard';
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const {allProducts} = useSelector((state)=> state.wishlist);
  const params = useParams();
  const productId = params?.productId;
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductDetails = async () => {
    if (!productId) return;
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/productDetails/${productId}`);
      if (!response?.data?.success) throw new Error("Error fetching details");
      setProductDetails(response?.data?.ProductDetails);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => { getProductDetails(); }, [productId]);

  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        /* 🟢 Change 1: Adjusted width to be more fluid on mobile */
        <div className="w-[95vw] md:w-[91vw] my-4 md:my-6 mx-auto bg-gray-950 rounded-md shadow-md overflow-hidden">
          
          {/* 🟢 Change 2: flex-col for mobile, lg:flex-row for laptop */}
          <div className="w-full flex flex-col lg:flex-row gap-4">
            
            {/* Image Section - Full width on mobile, 70% on large screens */}
            <div className="w-full lg:w-[70%] border border-gray-600 rounded-t-md lg:rounded-l-md overflow-hidden">
              <Swiper
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
              >
                {productDetails?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image?.url}
                      alt={`${productDetails?.productName}Image${index}`}
                      /* 🟢 Change 3: Dynamic height - shorter on mobile, taller on desktop */
                      className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-contain w-full bg-black"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Details - Full width on mobile, 30% on large screens */}
            <div className="w-full lg:w-[30%] flex flex-col gap-4 p-2 lg:p-0">
              
              {/* Price & Icons Container */}
              <div className="p-4 flex flex-col gap-4 min-h-[250px] border justify-center border-gray-600 rounded-md">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <LuIndianRupee size={28} className="md:size-[33px]" />
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {productDetails?.price}
                    </h2>
                  </div>

                  <div className="flex flex-row items-center gap-3">
                    <img src={aiImage} alt="aiIcon" className="h-8 md:h-10 cursor-pointer hover:scale-110 transition-transform" />
                    <BiShareAlt size={30} className="cursor-pointer hover:text-blue-500" 
                      onClick={()=>{
                        copy(window.location.href);
                        toast.success("Link copied!");
                    }}/>
                    {allProducts.some((item)=> item?._id === productDetails?._id ) ? 
                      <IoHeart size={32} className="cursor-pointer text-red-500" onClick={() => dispatch(removeProductFromWislist(productDetails))}/> : 
                      <GoHeart size={32} className="cursor-pointer" onClick={() => dispatch(addProductToWishlist(productDetails))}/>
                    }
                  </div>
                </div>

                <p className="font-semibold text-lg md:text-xl line-clamp-2">
                  {productDetails?.productName}
                </p>

                <div className="flex flex-row justify-between items-center text-gray-400 text-sm md:text-base">
                  <p>{productDetails?.location}</p>
                  <p>{moment(productDetails?.createdAt).format("ll")}</p>
                </div>
              </div>

              {/* Seller Info Container */}
              <div className="flex-grow border border-gray-600 p-4 flex flex-col gap-6 items-center justify-center rounded-md">
                <div className="flex items-center gap-3 w-full">
                  <img
                    src={productDetails?.sellerId?.profilePicture}
                    alt="Seller"
                    className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover border border-gray-500"
                  />
                  <div className="overflow-hidden">
                    <p className="text-gray-400 text-sm md:text-[18px] truncate">
                      Post by <span className="text-white font-medium">{productDetails?.sellerId?.firstName} {productDetails?.sellerId?.lastName}</span>
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm">
                      Member since {moment(productDetails?.sellerId?.createdAt).format("ll")}
                    </p>
                  </div>
                </div>
              
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  fullWidth 
                  sx={{ py: 1.5, fontWeight: 'bold' }}
                  onClick={() => navigate(`/chat/${productDetails?.sellerId?._id}`)}
                >
                  Chat with seller
                </Button>

                <div className="flex items-center text-[16px] gap-2 text-gray-400">
                  <IoCallOutline className="text-xl"/>
                  <p className="font-mono tracking-wider">{productDetails?.contactNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="mt-4 md:mt-6 border border-gray-600 p-4 md:p-6 rounded-md">
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Description</Typography>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base whitespace-pre-wrap">
              {productDetails?.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;