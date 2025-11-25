import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    endpoints: (builder) => ({
        getProductsByCategory: builder.query({
            query: (category) => `/${category}`
        }),
        getProduct: builder.query({
            query: (productId) => `/product/${productId}`
        }),

    })
})

export const { useGetProductsByCategoryQuery, useGetProductQuery } = apiSlice
