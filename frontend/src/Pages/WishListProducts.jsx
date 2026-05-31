import { Button, Typography, Container, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/Home/Product/ProductCard';
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

const WishListProducts = () => {
  const { allProducts } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();

  return (
    <Box className="min-h-screen bg-[#0B0B0F] py-10">
      <Container maxWidth="xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold', 
                color: 'white',
                letterSpacing: '-0.5px' 
              }}
            >
              My <span className="text-indigo-500">Wishlist</span>
            </Typography>
            <p className="text-gray-500 mt-1">Items you've saved for later</p>
          </div>

          <div className="flex items-center gap-3 bg-gray-900/50 border border-gray-800 px-4 py-2 rounded-xl">
            <p className="text-gray-400 font-medium">Total Items:</p>
            <span className="text-indigo-400 font-bold text-xl">{allProducts?.length || 0}</span>
          </div>
        </div>

        <hr className="border-gray-800 mb-8" />

        {/* Content Logic */}
        {!allProducts || allProducts.length < 1 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
              <IoHeartDislikeOutline size={100} className="relative text-gray-700" />
            </div>
            
            <div className="max-w-xs space-y-3">
              <h3 className="text-2xl font-bold text-white">Your wishlist is empty</h3>
              <p className="text-gray-500 leading-relaxed">
                See something you like? Tap the heart icon to save it here for later.
              </p>
              <Button 
                onClick={() => navigate("/")} 
                variant="contained" 
                size="large"
                endIcon={<FaArrowRight />}
                sx={{
                  mt: 2,
                  backgroundColor: '#6366F1',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  px: 4,
                  '&:hover': { backgroundColor: '#4F46E5' }
                }}
              >
                Start Exploring
              </Button>
            </div>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product, index) => (
              <div 
                key={product._id || index} 
                className="transform transition-all duration-300 hover:-translate-y-2"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Box>
  );
};

export default WishListProducts;