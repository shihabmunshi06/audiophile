import { apiSlice } from "./apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => `/products`,
            providesTags: ["products"]
        }),
        getProductsByCategory: builder.query({
            query: (category) => `/products/category/${category}`,
            providesTags: ["products"]
        }),
        getProduct: builder.query({
            query: (productId) => `/products/${productId}`,
            providesTags: ["products"]
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductsByCategoryQuery,
    useGetProductQuery,
} = productsApiSlice