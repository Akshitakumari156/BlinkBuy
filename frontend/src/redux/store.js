import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { userSlice } from "./slices/userData";
import { wishListSlice } from "./slices/wishlist";



export const store = configureStore({
    reducer:{
        auth:authSlice.reducer,
        user:userSlice.reducer,
        wishlist:wishListSlice.reducer,
    }
});