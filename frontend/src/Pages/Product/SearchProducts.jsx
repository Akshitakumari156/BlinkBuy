import React from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../../components/Home/Product/ProductCard';

const SearchProducts = () => {

    const location = useLocation();

    const allProducts = location.state?.allProducts;

    console.log("allProducts",allProducts);
    
  return (
    <div className='flex flex-wrap flex-row gap-4 w-[91vw] mx-auto  py-6'>
        {
            allProducts.map((product,index)=>{
                return <div key={index}>
                    <ProductCard product={product}/>
                </div>
            })
        }
    </div>
  )
}

export default SearchProducts