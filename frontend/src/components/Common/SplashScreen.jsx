import React from "react";
import LogoAnimation from "../Auth/LogoAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SplashScreen = () => {


    useGSAP(()=>{
    
        gsap.from(".spAnimation1",{
            x:-800,
            delay:0.6,
        });

        gsap.from(".spAnimation2",{
            x:800,
            delay:0.6,
        });

    })


  return (
    <div
      className="bg-[#0B0B0F] text-white h-screen w-screen
    overflow-x-hidden overflow-y-auto flex items-center justify-center flex-col gap-6"
    >
      <div>
        <LogoAnimation/>
      </div>
      <div className="flex items-center gap-4 text-xl text-gray-400 ">
        <div className="flex gap-[2px] spAnimation1">
            <p>Post Ads </p>
            <div className="bg-yellow-400 h-1 w-1 rounded-full mt-[18px]"></div>
            </div> 
          <div className="flex gap-[2px] spAnimation2">
            <p>Find Deals </p>
            <div className="bg-yellow-400 h-1 w-1 rounded-full mt-[18px]"></div>
            </div> 
      </div>
    </div>
  );
};

export default SplashScreen;
