import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';

const Categories = () => {

    const [loading, setLoading] = useState(false);
    const [allCategories, setAllCategories] = useState([]);
    const navigate = useNavigate();

    const getAllCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllCategories`);

            if (!response?.data?.success) {
                throw new Error("Error occur during fetching all categories");
            }
            setAllCategories(response?.data?.allCategories);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className='mt-2 bg-gray-900 py-4'>
            {
                loading ? (<div className='text-center animate-bounce text-white'>Loading...</div>) :
                (
                    /* Container: Responsive padding (smaller on mobile, larger on desktop) */
                    <div className='px-4 md:px-10 lg:px-20'>
                        {
                            allCategories.length < 1 ? (<div className='text-center text-white'>Categories not found</div>) :
                            (
                                <Swiper 
                                    className='flex items-center'
                                    /* ✅ Added Breakpoints for Mobile, Tablet, and PC */
                                    breakpoints={{
                                        320: { slidesPerView: 3, spaceBetween: 10 },
                                        480: { slidesPerView: 4, spaceBetween: 15 },
                                        768: { slidesPerView: 6, spaceBetween: 20 },
                                        1024: { slidesPerView: 8, spaceBetween: 20 },
                                        1440: { slidesPerView: 10, spaceBetween: 20 }
                                    }}
                                >
                                    {
                                        allCategories.map((category, index) => {
                                            return (
                                                <SwiperSlide 
                                                    key={category?._id || index}
                                                    onClick={() => navigate("/category/" + category?._id)}
                                                >
                                                    {/* Card: Removed fixed width 'w-32' to let Swiper handle sizing */}
                                                    <div className='flex h-24 sm:h-28 flex-col gap-1 items-center justify-center bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-700 cursor-pointer text-white'>
                                                        <img 
                                                            src={category?.categoryImage} 
                                                            alt={`${category?.categoryName}Image`} 
                                                            className='h-8 sm:h-12 object-contain' 
                                                        />
                                                        <p className='text-[10px] sm:text-xs md:text-sm text-center px-1 truncate w-full'>
                                                            {category?.categoryName}
                                                        </p>
                                                    </div>
                                                </SwiperSlide>
                                            )
                                        })
                                    }
                                </Swiper>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Categories