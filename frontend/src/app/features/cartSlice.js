import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartState: false,
    cartItems: [
        {
            id: 1,
            slug: "yx1-earphones",
            image: {
                mobile: "/assets/product-yx1-earphones/mobile/image-product.jpg",
                tablet: "/assets/product-yx1-earphones/tablet/image-product.jpg",
                desktop: "/assets/product-yx1-earphones/desktop/image-product.jpg"
            },
            price: 599,
            productAmount: 1
        },
        {
            id: 2,
            slug: "yx1-earphones",
            image: {
                mobile: "/assets/product-yx1-earphones/mobile/image-product.jpg",
                tablet: "/assets/product-yx1-earphones/tablet/image-product.jpg",
                desktop: "/assets/product-yx1-earphones/desktop/image-product.jpg"
            },
            price: 599,
            productAmount: 1
        },

    ]
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.cartState = !state.cartState
        },
        changeCart: (state, action) => {
            state.cartItems = action.payload
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

export default cartSlice.reducer
export const { toggleCart, changeCart, clearCart } = cartSlice.actions