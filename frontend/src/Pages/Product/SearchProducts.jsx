import React from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../../components/Home/Product/ProductCard';

const SearchProducts = () => {
    const location = useLocation();
    
    // Keeping your original logic intact
    const allProducts = location.state?.allProducts || [];

    console.log("allProducts", allProducts);
    
    return (
        /* 🟢 Change 1: Added a container with max-width and proper padding for mobile */
        <div className='w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-8'>
            
            <h1 className="text-2xl font-bold mb-6 text-white">Search Results</h1>

            {/* 🟢 Change 2: Replaced Flex with a Responsive Grid */}
            {allProducts.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {allProducts.map((product, index) => (
                        /* 🟢 Change 3: Ensuring cards take full width of their grid slot */
                        <div key={index} className="flex justify-center">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            ) : (
                /* 🟢 Change 4: Added a fallback message so the screen isn't just blank */
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-gray-400 text-xl">No products found matching your search.</p>
                </div>
            )}
        </div>
    )
}

export default SearchProducts