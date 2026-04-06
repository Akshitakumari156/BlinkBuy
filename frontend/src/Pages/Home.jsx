import React, { useEffect, useRef, useState } from 'react'
import Categories from '../components/Home/Categories'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Navigation ,Pagination,Autoplay} from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import image1 from "../assets/Investor-banner.webp"
import image2 from "../assets/68328523628574.webp"
import image3 from "../assets/1338bd4fc60390d8.webp"
import image4 from "../assets/uber_new_high._CB537689643_.jpg"
import image5 from "../assets/D323819370_DesktopHero_3000x1200._CB778388200_.jpg"
import image6 from "../assets/1600w-kU1ebZpbiSQ.webp"
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Common/Loader';
import ProductCard from '../components/Home/Product/ProductCard';
import SkelatonLoading from '../components/Common/SkelatonLoading';

const Home = () => {

  const [loading,setLoading] =  useState(false);
  const [allProducts,setAllProducts] =  useState([]);
  const productRef = useRef();
  const [page,setPage] = useState(1);
  const [lastcall,setLastcall]  = useState(false);
  

  const slides = [
    {
      imageUrl:image2
    },
    {
      imageUrl:image3
    },
    {
      imageUrl:image4
    },
    {
      imageUrl:image5
    },
        {
      imageUrl:image1
    },
    {
      imageUrl:image6
    },
  ]


  const getAllProducts =  async()=>{

    if(lastcall){
      return ;
    }

    if(loading){
      return ;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/get-products?page=${page}`);
      console.log("response",response);
      if(response?.data?.allProducts?.length < 12){
    setLastcall(true);
      }
      setAllProducts([...allProducts,...response?.data?.allProducts]);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
      
    }
  }

  const handleScroll = ()=>{

    if(lastcall){
      return ;
    }

    if(loading){
      return ;
    }
   
    const scrollHeight = productRef?.current?.scrollHeight;
    const clientHeight = productRef?.current?.clientHeight;
    const scrollTop =  productRef?.current?.scrollTop;

     if(clientHeight + scrollTop + 1 >= scrollHeight ){
     setPage(prev => prev + 1);
     }
    
    
  }

  useEffect(()=>{

    if(lastcall){
      return ;
    }

    if(loading){
      return ;
    }
    getAllProducts();
  },[page]);

  useEffect(()=>{

    productRef.current.addEventListener("scroll",handleScroll);

    return ()=>{
      productRef.current?.removeEventListener("scroll",handleScroll)
    }

  },[productRef])


  console.log("page",page);
  

  return (
    <div>

      {/* categories  */}
      <div>
        <Categories/>
      </div>

       {/* banner  */}
     <div >
       <Swiper navigation={true} pagination={true}  autoplay={true}
       modules={[Navigation,Pagination,Autoplay]} className='mt-2'>
        {
          slides.map((slide,index)=>{
            return <SwiperSlide key={index} >
              <img src={slide?.imageUrl} alt="bannerImage" 
              className='h-[300px] w-full object-fill' />
            </SwiperSlide>
          })
        }
       </Swiper>
     </div>
 
 {/* products */}
     <div ref={productRef} className='h-[100vh] overflow-y-auto'>
       {
        loading && page === 1 ? (<div className='flex flex-wrap flex-row gap-4 w-[91vw] mx-auto  py-4'>
          {
            Array.from({length:4}).map((_,i)=>{
              return <div key={i}> <SkelatonLoading/></div>
            })
          }
        </div>)  
        : 
        (
          <div>
             {
              allProducts.length < 1  ? (
                <div>Products not found</div>
              )
              : 
              (
                <div className='flex flex-col'>
                <div className='flex flex-wrap flex-row gap-4 w-[91vw] mx-auto  py-4'>
                  {
                    allProducts.map((product,index)=>{
                      return <div key={index}>
                            <ProductCard product={product}/>
                        </div>
                    })
                  }

                 

                </div>
                 {
                    loading &&  <i class="fa-solid fa-spinner self-center text-3xl animate-spin py-9"></i>
                  }
                  
                  {
                    lastcall && <div className='self-center text-3xl  py-9'>No more products 😔 </div>
                  }
                    </div>
              )
             }
          </div>
        )
       }
     </div>

    </div>
  )
}

export default Home