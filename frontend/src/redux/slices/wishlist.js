import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    allProducts:localStorage.getItem("wishlistProducts") ? JSON.parse(localStorage.getItem("wishlistProducts")) : [],
}

export const wishListSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addProductToWishlist:(state,value)=>{
          const isAdded =  state.allProducts.some((product)=> product?._id === value.payload?._id);
          if(isAdded){
            toast.error("Product allready added");
            return ;
          }
        state.allProducts.push(value.payload);
        localStorage.setItem("wishlistProducts",JSON.stringify(state.allProducts));
           toast.success("Product successfully added to wishlist");
        },
        removeProductFromWislist:(state,value)=>{

      const isAdded =  state.allProducts.some((product)=> product?._id === value.payload?._id);

      if(!isAdded){
        return ;
      }
       const filteredProducts =  state.allProducts.filter((product)=> product?._id !== value.payload?._id);
       state.allProducts = filteredProducts;
       localStorage.setItem("wishlistProducts",JSON.stringify(state.allProducts));
       toast.error("Product removed successfully");
        }
    }
})

export const {addProductToWishlist,removeProductFromWislist} = wishListSlice.actions;
export default wishListSlice.reducer;