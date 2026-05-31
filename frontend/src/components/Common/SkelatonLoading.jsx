import React from "react";

const SkelatonLoading = () => {
  return (
    <div
      className="w-full border bg-gray-900 border-gray-600 px-2 py-2 rounded-md flex flex-col gap-4 animate-pulse"
    >
      {/* Product Image Skeleton */}
      <div className="w-full h-[160px] sm:h-[180px] bg-gray-800 rounded-md"></div>

      <div className="flex flex-col gap-3">
        {/* Price Skeleton */}
        <div className="bg-gray-700 h-6 w-1/3 rounded-md"></div>

        {/* Title Skeleton */}
        <div className="bg-gray-700 h-4 w-3/4 rounded-md"></div>

        {/* Description Skeleton */}
        <div className="bg-gray-700 h-3 w-full rounded-md"></div>

        {/* Footer (Location/Date) Skeleton */}
        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-800">
            <div className="bg-gray-700 h-2 w-1/4 rounded-md"></div>
            <div className="bg-gray-700 h-2 w-1/6 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default SkelatonLoading;