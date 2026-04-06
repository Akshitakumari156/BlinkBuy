import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/Common/Loader";
import ProductCard from "../components/Home/Product/ProductCard";
import SkelatonLoading from "../components/Common/SkelatonLoading";

const CategoryDetails = () => {
  const params = useParams();
  const categoryId = params?.categoryId;
  const [loading, setLoading] = useState(false);
  const [categoryPageDetails, setCategoryPageDetails] = useState({});

  const getCategoryPageDetails = async () => {
    if (!categoryId) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categoryDetails/${categoryId}`
      );

      if (!response?.data?.success) {
        throw new Error("Error occur during fetching category page details");
      }
      setCategoryPageDetails(response?.data?.categoryPageDetails);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getCategoryPageDetails();
  }, [categoryId]);

  console.log("categoryPageDetails", categoryPageDetails);

  return (
    <>
      {loading ? (
         <div className='flex flex-wrap flex-row gap-4 w-[91vw] mx-auto  py-4'>
          {
            Array.from({length:4}).map((_,i)=>{
              return <SkelatonLoading/>
            })
          }
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 h-24 flex items-center px-6 font-semibold">
            <p>
              <span className="text-gray-400">Home</span>{" "}
              <span className="text-gray-400">/</span>{" "}
              <span className="text-gray-400">Category</span>{" "}
              <span className="text-gray-400">/</span>{" "}
              <span className="text-yellow-400">
                {categoryPageDetails?.categoryName}
              </span>
            </p>
          </div>
          <div className="w-[91vw] mx-auto mt-6">
            <h2 className="flex items-center gap-1 text-2xl font-semibold">
              <p>{categoryPageDetails?.categoryAllProducts?.length}</p>
              <p>Used</p>
              <p>{categoryPageDetails?.categoryName}</p>
              <p>in India - Buy Second Hand</p>
              <p>{categoryPageDetails?.categoryName}</p>
            </h2>
            <hr />
            
            {/* products  */}
            <div>
               {
                categoryPageDetails?.categoryAllProducts?.length < 1 ? <div className="text-center mt-36 mb-36 text-xl font-semibold">Products not found</div>
                : 
                <div className="mt-6 mb-6 flex flex-wrap flex-row gap-4"> 
                  {
                    categoryPageDetails?.categoryAllProducts?.map((product,index)=>{
                        return <div key={index}>
                            <ProductCard product={product}/>
                        </div>
                    })
                  }
                </div>
               }
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default CategoryDetails;
