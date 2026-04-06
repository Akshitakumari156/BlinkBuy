import React from "react";

const SkelatonLoading = () => {
  return (
    <div
      className="w-[337px] h-[315px] border bg-gray-900 border-gray-600 px-2 py-2 rounded-md flex flex-col gap-4 
    animate-pulse"
    >
      <div className="w-full h-[180px] bg-gray-500 rounded-md animate-pulse"></div>

      <div className="flex flex-col gap-2">
        <div className="bg-gray-500 h-2 w-4 px-12 py-4 rounded-md animate-pulse"></div>

        <div className=" -mt-1 mb-1 bg-gray-500 h-2 w-4 px-24 py-4 rounded-md animate-pulse"></div>

        <div className="bg-gray-500 h-2 w-full px-24 py-4 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkelatonLoading;
