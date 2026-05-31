import React from "react";
import LogoAnimation from "../Auth/LogoAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SplashScreen = () => {

  useGSAP(() => {
    // Using xPercent instead of fixed pixels makes the animation 
    // smooth regardless of screen width (Mobile vs PC)
    gsap.from(".spAnimation1", {
      xPercent: -200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.6,
    });

    gsap.from(".spAnimation2", {
      xPercent: 200,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.6,
    });
  })

  return (
    <div
      className="bg-[#0B0B0F] text-white h-screen w-full
    overflow-hidden flex items-center justify-center flex-col gap-8 px-4"
    >
      {/* LOGO AREA - Scales naturally via LogoAnimation component */}
      <div className="scale-75 md:scale-100">
        <LogoAnimation />
      </div>

      {/* TEXT AREA - Stacked on tiny phones, Row on Tablet/PC */}
      <div className="flex flex-col xs:flex-row items-center gap-2 xs:gap-6 text-lg md:text-2xl text-gray-400 font-medium tracking-wide">
        
        <div className="flex items-center gap-1.5 spAnimation1">
          <p className="whitespace-nowrap">Post Ads</p>
          <div className="bg-yellow-400 h-1.5 w-1.5 rounded-full mt-1"></div>
        </div>

        <div className="flex items-center gap-1.5 spAnimation2">
          <p className="whitespace-nowrap">Find Deals</p>
          <div className="bg-yellow-400 h-1.5 w-1.5 rounded-full mt-1"></div>
        </div>

      </div>
    </div>
  );
};

export default SplashScreen;