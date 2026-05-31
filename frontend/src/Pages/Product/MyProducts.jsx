import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import SkelatonLoading from '../../components/Common/SkelatonLoading';
import ProductCard from '../../components/Home/Product/ProductCard';
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const MyProducts = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/userProducts`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (!response?.data?.success) throw new Error("Error fetching products");
      setAllProducts(response?.data?.allProducts);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const deleteProdoctHandler = async (productId) => {
    const confirm = window.confirm("Are you sure want to delete this product?");
    if (!confirm || deleteLoading) return;

    const toastId = toast.loading("Deleting product...");
    try {
      setDeleteLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteProduct/${productId}`, {
        headers: { Authorization: 'Bearer ' + token }
      });
      if (!response?.data?.success) throw new Error("Delete failed");
      
      setAllProducts(prev => prev.filter(p => p?._id !== productId));
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      toast.dismiss(toastId);
      setDeleteLoading(false);
    }
  }

  useEffect(() => { getAllProducts(); }, []);

  return (
    /* 🟢 Container: Fluid width with a max-limit for ultra-wide monitors */
    <div className="w-full max-w-[1440px] mx-auto px-4 py-6 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-white">My Products</h1>

      {loading ? (
        /* 🟢 Loading State: Grid matches the actual content grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="w-full flex justify-center">
              <SkelatonLoading />
            </div>
          ))}
        </div>
      ) : allProducts.length < 1 ? (
        /* 🟢 Empty State: Better vertical centering */
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-gray-500 text-xl font-medium">No products found in your catalog.</p>
          <button 
            onClick={() => navigate('/upload-product')}
            className="mt-4 text-blue-500 hover:underline"
          >
            Upload your first product
          </button>
        </div>
      ) : (
        /* 🟢 Main Grid: 1 col on mobile, 2 on small tabs, 3 on tabs, 4 on laptops */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product, index) => (
            <div key={index} className="flex flex-col group h-full">
              {/* Product Card Component */}
              <div className="flex-grow">
                <ProductCard product={product} />
              </div>

              {/* 🟢 Action Buttons: Improved spacing and touch targets */}
              <div className="flex flex-row justify-between px-4 py-3 items-center border-b border-l border-r border-gray-700 bg-gray-900 rounded-b-md -mt-1 shadow-lg">
                <button
                  aria-label="Edit product"
                  className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  onClick={() => navigate("/upload-product", { state: product })}
                >
                  <MdOutlineModeEdit size={24} className="text-blue-400" />
                </button>

                <button
                  aria-label="Delete product"
                  className="p-2 hover:bg-red-900/20 rounded-full transition-colors"
                  onClick={() => deleteProdoctHandler(product?._id)}
                >
                  <MdDelete size={24} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyProducts;