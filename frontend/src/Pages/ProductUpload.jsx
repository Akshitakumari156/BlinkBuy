import { Button, InputAdornment, TextField, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaFileCode, FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import aiLogo from "../assets/gemini-color.png";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";

const ProductUpload = () => {
  const { userData } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [condition, setCondition] = useState("Used");
  const [formdata, setFormData] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    location: "",
    contactNumber: "",
  });
  const [images, setImages] = useState([]);
  const [descLoading, setDescLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const productData = location?.state;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };

  const imageRemoveHandler = (imageIndex) => {
    const remainImages = images.filter((img, index) => index !== imageIndex);
    setImages(remainImages);
  };

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllCategories`);
      if (!response?.data?.success) throw new Error("Error");
      setAllCategories(response?.data?.allCategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (descLoading) return;
    const formData = new FormData();
    formData.append("productName", formdata.productName);
    formData.append("contactNumber", formdata.contactNumber);
    formData.append("categoryId", formdata.category);
    formData.append("location", formdata.location);
    formData.append("price", formdata.price);
    formData.append("condition", condition);
    formData.append("sellerId", userData?._id);
    formData.append("description", formdata.description);
    for (let i = 0; i < images.length; i++) { formData.append("images", images[i]); }

    const toastId = toast.loading("Uploading product...");
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload-product`, formData, {
        headers: { Authorization: 'Bearer ' + token }
      });
      toast.dismiss(toastId);
      navigate("/myproducts");
      toast.success(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const productUpdateHandler = async (e) => {
    e.preventDefault();
    if (descLoading) return;
    const toastId = toast.loading("Updating...");
    try {
      setLoading(true);
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/editProduct`, formdata, {
        headers: { Authorization: 'Bearer ' + token }
      });
      toast.dismiss(toastId);
      navigate("/myproducts");
      toast.success(response?.data?.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const productTitleEnhancerHandler = async () => {
    if (loading || !formdata.productName) { toast.error("Enter name first"); return; }
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/productTitleEnhancer`, { title: formdata.productName }, { headers: { Authorization: 'Bearer ' + token } });
      if (response?.data?.success) setFormData({ ...formdata, productName: response?.data?.response });
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  const productDescriptionEnhancerHandler = async () => {
    if (loading || formdata.description.length < 10) { toast.error("Too short"); return; }
    try {
      setDescLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/productDescriptionEnhancer`, { description: formdata.description }, { headers: { Authorization: 'Bearer ' + token } });
      setFormData({ ...formdata, description: response?.data?.response });
      setDescLoading(false);
    } catch (error) { setDescLoading(false); }
  };

  useEffect(() => { getAllCategories(); }, []);
  useEffect(() => { if (productData) { setFormData(productData); setCondition(productData?.condition); } }, [productData]);

  return (
    <Box className="min-h-screen bg-[#0B0B0F] text-white py-10 px-4">
      {/* Title Section */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {productData ? "Update" : "Create"} <span className="text-indigo-500">Listing</span>
        </Typography>
        <p className="text-gray-400 mt-2">Fill in the details below to reach thousands of local buyers.</p>
      </div>

      {/* Main Form Container */}
      <div className="max-w-3xl mx-auto bg-[#12121A] border border-gray-800 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-600/10 blur-[100px] rounded-full"></div>
        
        <form className="flex flex-col gap-8 relative z-10" onSubmit={productData ? productUpdateHandler : submitHandler}>
          
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
              <h3 className="text-lg font-semibold uppercase tracking-wider">Item Details</h3>
            </div>

            <TextField
              fullWidth
              variant="outlined"
              label="Product Title"
              name="productName"
              value={formdata.productName}
              onChange={changeHandler}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <button type="button" onClick={productTitleEnhancerHandler} className="hover:scale-110 transition-transform">
                      <img src={aiLogo} alt="AI" className="h-9 w-9 object-contain" />
                    </button>
                  </InputAdornment>
                ),
              }}
              sx={textFieldStyles}
            />

            <div className="relative">
              <textarea
                className="w-full bg-[#1F2937]/50 border border-gray-700 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 transition-all min-h-[150px] placeholder:text-gray-500"
                placeholder="Describe your item (condition, features, defects...)"
                name="description"
                value={formdata.description}
                onChange={changeHandler}
                required
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2 bg-[#12121A] p-1 rounded-xl border border-gray-700">
                <span className="text-[10px] text-gray-400 ml-2 uppercase font-bold">AI Enhance</span>
                {descLoading ? (
                  <div className="h-8 w-8 flex items-center justify-center"><i className="fa-solid fa-spinner animate-spin text-indigo-400"></i></div>
                ) : (
                  <img src={aiLogo} alt="AI" className="h-8 w-8 cursor-pointer hover:rotate-12 transition-all" onClick={productDescriptionEnhancerHandler} />
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              type="number"
              label="Price (₹)"
              name="price"
              value={formdata.price}
              onChange={changeHandler}
              required
              sx={textFieldStyles}
            />
            <div className="flex flex-col gap-1">
              <select
                className="h-[56px] bg-[#1F2937]/50 border border-gray-700 rounded-xl px-4 text-white outline-none focus:border-indigo-500 appearance-none cursor-pointer"
                name="category"
                value={formdata.category}
                onChange={changeHandler}
                required
              >
                <option value="" className="bg-gray-900">Select Category</option>
                {allCategories.map((cat) => (
                  <option key={cat._id} value={cat._id} className="bg-gray-900">{cat.categoryName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 3: Location & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField
              label="Location"
              name="location"
              value={formdata.location}
              onChange={changeHandler}
              required
              sx={textFieldStyles}
            />
            <TextField
              type="number"
              label="Contact Number"
              name="contactNumber"
              value={formdata.contactNumber}
              onChange={changeHandler}
              required
              sx={textFieldStyles}
            />
          </div>

          {/* Section 4: Condition */}
          <div className="bg-[#1F2937]/30 p-4 rounded-2xl border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-gray-400 uppercase text-sm font-bold tracking-widest">Condition</span>
            <div className="flex p-1 bg-gray-900 rounded-xl w-full sm:w-auto">
              {["New", "Used"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCondition(item)}
                  className={`flex-1 sm:px-8 py-2 rounded-lg text-sm font-bold transition-all ${condition === item ? "bg-indigo-600 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Section 5: Photo Upload */}
          {!productData && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                <h3 className="text-lg font-semibold uppercase tracking-wider">Photos</h3>
              </div>
              
              <label className="group relative block w-full">
                <div className="border-2 border-dashed border-gray-700 group-hover:border-indigo-500 bg-[#1F2937]/20 rounded-3xl p-8 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer">
                  {images.length < 1 ? (
                    <>
                      <div className="bg-indigo-500/10 p-4 rounded-full text-indigo-500 group-hover:scale-110 transition-transform">
                        <FaCloudUploadAlt size={40} />
                      </div>
                      <p className="text-gray-400 font-medium">Click to upload product images</p>
                      <p className="text-gray-600 text-xs uppercase tracking-tighter">JPG, PNG up to 5MB</p>
                    </>
                  ) : (
                    <div className="flex flex-wrap justify-center gap-4">
                      {images.map((img, index) => (
                        <div key={index} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-500 shadow-xl">
                          <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                          <button onClick={(e) => { e.preventDefault(); imageRemoveHandler(index); }} className="absolute top-1 right-1 bg-black/70 p-1 rounded-full hover:bg-red-500 transition-colors">
                            <RxCross2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input type="file" className="hidden" multiple onChange={handleImageChange} />
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 text-white font-black uppercase tracking-[3px] rounded-2xl shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-4"
          >
            {loading ? <i className="fa-solid fa-spinner animate-spin text-xl"></i> : (productData ? "Update Listing" : "Publish Ad")}
          </button>
        </form>
      </div>
    </Box>
  );
};

// Reusable MUI Styles for a consistent look
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "#1F293780",
    borderRadius: "16px",
    "& fieldset": { borderColor: "#374151" },
    "&:hover fieldset": { borderColor: "#4F46E5" },
    "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
  },
  "& .MuiInputLabel-root": { color: "#9CA3AF" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#818CF8" },
};

export default ProductUpload;