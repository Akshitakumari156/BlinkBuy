import React from "react";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0B0B0F] min-h-screen flex items-center justify-center px-6 text-gray-300">
      <div className="text-center w-full max-w-2xl">

        {/* ICON - Scaled for Mobile/PC */}
        <div className="flex justify-center mb-6 md:mb-8">
          <FaExclamationTriangle className="text-indigo-500 text-5xl md:text-7xl" />
        </div>

        {/* ERROR CODE - Responsive font sizes */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 md:mb-4">404</h1>

        {/* TITLE */}
        <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 px-2">
          Page Not Found
        </h2>

        {/* DESC */}
        <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back to SmartX marketplace.
        </p>

        {/* BUTTONS - Responsive Stack */}
        <div className="flex flex-col xs:flex-row gap-3 md:gap-4 justify-center items-center">

          <button
            onClick={() => navigate("/")}
            className="w-full xs:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-medium transition-all active:scale-95"
          >
            <FaHome />
            Go Home
          </button>

          <button
            onClick={() => navigate(-1)} // ✅ Changed to "Go Back" logic
            className="w-full xs:w-auto flex items-center justify-center gap-2 border border-gray-700 hover:border-indigo-500 px-8 py-3 rounded-xl font-medium transition-all active:scale-95"
          >
            <FaArrowLeft />
            Go Back
          </button>

        </div>

        {/* EXTRA TEXT */}
        <div className="mt-12 md:mt-16 text-xs md:text-sm text-gray-500">
          Need help? <span className="text-indigo-400 cursor-pointer hover:underline">Contact SmartX support</span> anytime.
        </div>
      </div>
    </div>
  );
};

export default Error;