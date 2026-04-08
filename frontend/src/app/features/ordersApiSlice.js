import { apiSlice } from "./apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `/orders`,
            providesTags: ["orders"]
        }),
        getOrder: builder.query({
            query: (orderId) => `/orders/${orderId}`,
            providesTags: ["orders"]
        }),
        addOrder: builder.mutation({
            query: (data) => ({
                url: `/orders`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["orders"]
        }),
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useAddOrderMutation,
} = ordersApiSlice