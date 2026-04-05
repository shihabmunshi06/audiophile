import { configureStore } from "@reduxjs/toolkit"

import { apiSlice } from "./features/apiSlice"

import cartReducer from "./features/cartSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (defmids) => defmids().concat(apiSlice.middleware)
})

export default store