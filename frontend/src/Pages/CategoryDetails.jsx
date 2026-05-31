import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/Home/Product/ProductCard";
import SkelatonLoading from "../components/Common/SkelatonLoading";

const CategoryDetails = () => {
  const params = useParams();
  const categoryId = params?.categoryId;
  const [loading, setLoading] = useState(false);
  const [categoryPageDetails, setCategoryPageDetails] = useState({});

  const getCategoryPageDetails = async () => {
    if (!categoryId) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categoryDetails/${categoryId}`
      );

      if (!response?.data?.success) {
        throw new Error("Error occur during fetching category page details");
      }
      setCategoryPageDetails(response?.data?.categoryPageDetails);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryPageDetails();
    // Scroll to top when category changes
    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {loading ? (
        /* 🟢 Change 1: Improved Skeleton Grid padding/alignment */
        <div className="flex flex-wrap justify-center md:justify-start gap-4 w-[91vw] mx-auto py-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkelatonLoading key={i} />
          ))}
        </div>
      ) : (
        <div>
          {/* Breadcrumbs - 🟢 Change 2: Responsive height and text size */}
          <div className="bg-gray-900/50 border-b border-gray-800 py-4 md:py-0 md:h-20 flex items-center px-4 md:px-16 font-medium">
            <p className="text-sm md:text-base">
              <Link to="/" className="text-gray-400 hover:text-white transition-all">Home</Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-400">Category</span>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-yellow-500">
                {categoryPageDetails?.categoryName}
              </span>
            </p>
          </div>

          <div className="w-[91vw] mx-auto mt-8">
            {/* 🟢 Change 3: Optimized Heading for Mobile */}
            <div className="mb-6">
              <h2 className="text-xl md:text-3xl font-bold flex flex-wrap items-center gap-x-2">
                <span className="text-indigo-500">
                  {categoryPageDetails?.categoryAllProducts?.length || 0}
                </span>
                <span>Used {categoryPageDetails?.categoryName}</span>
                <span className="text-gray-400 text-lg md:text-xl font-normal">
                  in India
                </span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Buy & Sell Second Hand {categoryPageDetails?.categoryName}</p>
            </div>
            
            <hr className="border-gray-800" />

            {/* Products Grid */}
            <div className="mt-8 pb-20">
              {categoryPageDetails?.categoryAllProducts?.length < 1 ? (
                <div className="text-center py-40 border-2 border-dashed border-gray-800 rounded-xl">
                  <p className="text-xl font-semibold text-gray-500">No products found in this category</p>
                  <Link to="/" className="text-indigo-500 underline mt-2 inline-block">Back to Home</Link>
                </div>
              ) : (
                /* 🟢 Change 4: Responsive Grid Layout (1 col mobile, 2 tablet, 4 desktop) */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {categoryPageDetails?.categoryAllProducts?.map((product, index) => (
                    <div key={product._id || index} className="flex justify-center">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;