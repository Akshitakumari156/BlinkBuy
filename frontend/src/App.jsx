import React, { useEffect, useState } from 'react'
import SignUp from './Pages/Auth/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Otp from './Pages/Auth/Otp'
import Login from './Pages/Auth/Login'
import ForgotPassword from "./Pages/Auth/ForgetPassword"
import ResetPassOtpVerify from './Pages/Auth/ResetPassOtpVerify'
import ResetPassword from './Pages/Auth/ResetPassword'
import Home from './Pages/Home'
import Navbar from './components/Common/Navbar'
import { Toaster } from 'react-hot-toast'
import ProductUpload from './Pages/ProductUpload'
import SplashScreen from './components/Common/SplashScreen'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import WishListProducts from './Pages/WishListProducts'
import ProductDetails from './Pages/Product/ProductDetails'
import Footer from './components/Common/Footer'
import Setting from './Pages/Setting'
import Help from './Pages/Help'
import CategoryDetails from './Pages/CategoryDetails'
import SearchProducts from './Pages/Product/SearchProducts'
import chatboatLogo from "./assets/chatboatLogo.png";
import ChatboatModal from './components/ChatboatModal'
import MyProducts from './Pages/Product/MyProducts'


const App = () => {

  const [showSplash,setShowSplash] = useState(true);
  const [chatboat,setChatboat] = useState(false);

  const router = createBrowserRouter([
    {
      path:"/",element:<><Navbar/><Home/></>
    },
    {
      path:"/signup",element:<><Navbar/><SignUp/></>
    },
    {
      path:"/otp",element:<><Navbar/><Otp/></>
    },
    {
      path:"/login",element:<><Navbar/><Login/></>
    },
    {
      path:"/forgot-password",element:<><Navbar/><ForgotPassword/></>
    },
    {
      path:"/resetPassOtpVerify",element:<><Navbar/><ResetPassOtpVerify/></>
    },
    {
      path:"/reset-password",element:<><Navbar/><ResetPassword/></>
    },
    {
      path:"/upload-product",element:<><Navbar/><ProductUpload/></>
    },
    {
      path:"/about-us",element:<><Navbar/><AboutUs/><Footer/></>
    },
    {
      path:"/contact-us",element:<><Navbar/><ContactUs/><Footer/></>
    },
    {
      path:"/wishlist-products",element:<><Navbar/><WishListProducts/><Footer/></>
    },
    {
      path:"/product-details/:productId",element:<><Navbar/><ProductDetails/><Footer/></>
    },
    {
      path:"/settings",element:<><Navbar/><Setting/><Footer/></>
    },
    {
      path:"/help",element:<><Navbar/><Help/><Footer/></>
    },
    {
      path:"/category/:categoryId",element:<><Navbar/><CategoryDetails/><Footer/></>
    },
    {
      path:"/searchProducts",element:<><Navbar/><SearchProducts/><Footer/></>
    },
    {
      path:"/MyProducts",element:<><Navbar/><MyProducts/><Footer/></>
    }

  ])

  useEffect(()=>{
   const timer =  setTimeout(()=>{   
      setShowSplash(false)
    },2000);

    return ()=>{
      clearTimeout(timer);
    }

  },[])


  if(showSplash){
    return (
      <SplashScreen/>
    )
  }


  return (
    <div className='bg-[#0B0B0F] text-white h-screen w-screen
    overflow-x-hidden overflow-y-auto'>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster/>

      <div className="fixed z-50 bottom-3 cursor-pointer animate-bounce right-8 bg-gray-800
      flex items-center justify-center rounded-full "
      onClick={()=>{setChatboat(true)}}>
        <img src={chatboatLogo} alt="chatboatLogoImage" 
        className='h-24 object-cover'/>
      </div>

      {
        chatboat && <ChatboatModal setChatboat={setChatboat}/>
      }
   
    </div>

 
  )
}

export default App