import React from 'react'
import "./App.css"
import SignUp from './Pages/Auth/SignUp'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Otp from './Pages/Auth/Otp'
import Login from './Pages/Auth/Login'
import ForgotPassword from "./Pages/Auth/ForgetPassword"


const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",element:<><SignUp/></>
    },
    {
      path:"/otp",element:<><Otp/></>
    },
    {
      path:"/login",element:<><Login/></>
    },
    {
      path:"/forgot-password",element:<><ForgotPassword/></>
    }
  ])
  return (
    <div className='bg-[#0B0B0F] text-white h-screen w-screen
    overflow-x-hidden overflow-y-auto'>
      <RouterProvider router={router}>

      </RouterProvider>
   
    </div>

 
  )
}

export default App