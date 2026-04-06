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

const ProductDetails = () => {
  const {allProducts} = useSelector((state)=> state.wishlist);
  const params = useParams();
  const productId = params?.productId;
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const dispatch = useDispatch();
  

  const getProductDetails = async () => {
    if (!productId) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/productDetails/${productId}`
      );

      if (!response?.data?.success) {
        throw new Error("Error occur during fetching product details");
      }
      setProductDetails(response?.data?.ProductDetails);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  const addProductToWishlistHandler =  ()=>{
    dispatch(addProductToWishlist(productDetails));
  }

  const removeProductHandler = ()=>{
    dispatch(removeProductFromWislist(productDetails));
  }

  return (
    <>
      {loading ? (
        <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-[91vw] my-6 mx-auto  bg-gray-950 rounded-md shadow-md">
          <div className="w-full flex gap-4">
            {/* image  */}
            <div className="w-[70%] border border-gray-600">
              <Swiper
                navigation={true}
                pagination={true}
                modules={[Navigation, Pagination]}
              >
                {productDetails?.images?.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        src={image?.url}
                        alt={`${productDetails?.productName}Image${index}`}
                        className="h-[550px] object-contain w-full"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* product  details  */}
            <div className="w-[30%]  h-[550px] flex flex-col gap-4">
              <div className="p-2 flex flex-col gap-4 h-[45%] border justify-center border-gray-600 ">
                {/* price and icons  */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 ">
                    <LuIndianRupee size={33} />
                    <h2 className="text-4xl font-semibold">
                      {productDetails?.price}
                    </h2>
                  </div>

                  {/* icons  */}
                  <div className="flex flex-row items-center gap-4 ">
                    <img src={aiImage} alt="aiIcon" className="h-10 object-cover cursor-pointer" />
                    <BiShareAlt size={33} className="cursor-pointer" 
                    onClick={()=>{
                      copy(location.href);
                      toast.success("Copied! We’ve copied it to your clipboard");
                    }}/>
                     {
                        allProducts.some((item)=> item?._id === productDetails?._id ) ? 
                               <IoHeart  size={36} className="cursor-pointer" onClick={removeProductHandler}/> 
                               : 
                              <GoHeart  size={36} className="cursor-pointer" onClick={addProductToWishlistHandler}/>
                    }
                  </div>
                </div>

                {/* product name  */}
                <p className="font-semibold text-xl">
                  {productDetails?.productName}
                </p>

                {/* location and product upload date  */}
                <div className="flex flex-row justify-between items-center text-gray-400 ">
                  <p>{productDetails?.location}</p>

                  <p>{moment(productDetails?.createdAt).format("ll")}</p>
                </div>
              </div>

              <div className="h-[55%]  border border-gray-600 p-2 flex flex-col gap-8 items-center  justify-center">
                <div className="flex items-center gap-2 w-full">
                  <img
                    src={productDetails?.sellerId?.profilePicture}
                    alt={`${productDetails?.sellerId?.firstName}Image`}
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <p className="text-gray-400 text-[18px]">
                      Post by <span className="text-white">{productDetails?.sellerId?.firstName}</span>{" "}
                      <span  className="text-white">{productDetails?.sellerId?.lastName}</span>
                    </p>
                    <p className="text-gray-400">
                        Member since <span>
                                {moment(productDetails?.sellerId?.createdAt).format("ll")}
                        </span>
                    </p>
                  </div>
                </div>
              
              <Button variant="outlined" color="secondary" size="large" fullWidth>Chat with seller</Button>

              <div className="flex items-center text-[16px] gap-1 text-gray-400">
                <IoCallOutline/>
                <p>
                    {
                        productDetails?.contactNumber
                    }
                </p>
              </div>
 
              </div>
            </div>
          </div>

          {/* description of the product  */}
          <div className="mt-6 border border-gray-600 p-6">
            <Typography variant="h5">Description</Typography>
            <p className="mt-2">
              {
                productDetails?.description
              }
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
